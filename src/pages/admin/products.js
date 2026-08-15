import React, { useState, useEffect, useCallback } from 'react'
import cn from 'classnames'
import toast from 'react-hot-toast'
import Image from 'next/image'
import Layout from '../../components/Layout'
import { useStateContext } from '../../utils/context/StateContext'
import { getAllDataByType } from '../../lib/nhost'
import { processImage } from '../../utils/imageProcessor'
import { PageMeta } from '../../components/Meta'

import styles from '../../styles/pages/Admin.module.sass'

const emptyForm = {
  id: null,
  title: '',
  description: '',
  price: '',
  count: '',
  color: '#3498db',
  category_id: '',
  is_premium: true,
  file_url: '',
  demo_url: '',
  images: [],
  watermark: true,
}

const fileUrl = id =>
  `https://${process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || 'dspprxgtnymanbtxneyo'}.${process.env.NEXT_PUBLIC_NHOST_REGION || 'us-east-1'}.nhost.run/v1/files/${id}`

const AdminProducts = ({ navigationItems, categories }) => {
  const { cosmicUser } = useStateContext()
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [uploading, setUploading] = useState(false)
  const [authed, setAuthed] = useState(false)
  const [importOpen, setImportOpen] = useState(false)
  const [importFile, setImportFile] = useState(null)
  const [importing, setImporting] = useState(false)
  const [importResult, setImportResult] = useState(null)

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth')
    if (!adminAuth) {
      window.location.href = '/admin/login'
      return
    }
    try {
      const parsed = JSON.parse(adminAuth)
      if (!parsed.userId) {
        window.location.href = '/admin/login'
        return
      }
    } catch {
      window.location.href = '/admin/login'
      return
    }
    setAuthed(true)
  }, [])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/products')
      const data = await res.json()
      if (data.products) {
        setProducts(data.products)
      } else {
        toast.error(data.message || 'Erreur de chargement')
      }
    } catch (err) {
      console.error(err)
      toast.error('Erreur réseau')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const uploadImage = async file => {
    setUploading(true)
    try {
      const { blob, dataUrl, resized, watermarked } = await processImage(file, {
        watermark: form.watermark,
      })

      const tile = { id: null, url: dataUrl, uploading: true }
      setForm(prev => ({ ...prev, images: [...prev.images, tile] }))

      const formData = new FormData()
      formData.append('file', blob, `image.${blob.type === 'image/gif' ? 'gif' : 'webp'}`)

      const res = await fetch('/api/admin/products?upload=true', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (res.ok && data.file_id) {
        setForm(prev => ({
          ...prev,
          images: prev.images.map(img =>
            img === tile ? { id: data.file_id, url: data.public_url, uploading: false } : img
          ),
        }))
        toast.success(
          `${resized ? 'Redimensionnée + ' : ''}${watermarked ? 'Filigrane + ' : ''}Image uploadée !`
        )
      } else {
        setForm(prev => ({ ...prev, images: prev.images.filter(img => img !== tile) }))
        toast.error(data.message || 'Erreur upload')
      }
    } catch (err) {
      console.error(err)
      toast.error('Erreur réseau upload')
    }
    setUploading(false)
  }

  const handleImagesChange = e => {
    const files = e.target.files
    if (files && files.length) {
      Array.from(files).forEach(uploadImage)
    }
    e.target.value = ''
  }

  const handleRemoveImage = index => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.title || !form.category_id) {
      toast.error('Titre et catégorie sont obligatoires')
      return
    }

    setLoading(true)
    const isEdit = !!form.id
    const images = form.images.filter(img => img.id)
    try {
      const res = await fetch('/api/admin/products', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: form.id,
          title: form.title,
          description: form.description,
          price: Number(form.price) || 0,
          count: Number(form.count) || 1,
          color: form.color,
          category_id: form.category_id,
          is_premium: form.is_premium,
          file_url: form.file_url,
          demo_url: form.demo_url,
          image_id: images[0]?.id || null,
          gallery: images.slice(1).map(({ id, url }) => ({ id, url })),
        }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success(isEdit ? 'Produit mis à jour !' : 'Produit créé !')
        setForm(emptyForm)
        fetchProducts()
      } else {
        toast.error(data.message || 'Erreur lors de la sauvegarde')
      }
    } catch (err) {
      console.error(err)
      toast.error('Erreur réseau')
    }
    setLoading(false)
  }

  const handleEdit = product => {
    const meta = product.metadata || {}
    const gallery = [
      ...(product.image_id
        ? [{ id: product.image_id, url: fileUrl(product.image_id), uploading: false }]
        : []),
      ...(Array.isArray(meta.gallery) ? meta.gallery.map(img => ({ ...img, uploading: false })) : []),
    ]
    setForm({
      id: product.id,
      title: product.title,
      description: product.description || '',
      price: String(product.price || ''),
      count: String(product.count ?? ''),
      color: product.color || '#3498db',
      category_id: product.category_id || '',
      is_premium: product.is_premium !== false,
      file_url: product.file_url || '',
      demo_url: meta.demo_url || '',
      images: gallery,
      watermark: true,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async product => {
    if (!confirm(`Supprimer "${product.title}" ?`)) return
    setLoading(true)
    try {
      const res = await fetch('/api/admin/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: product.id }),
      })
      if (res.ok) {
        toast.success('Produit supprimé')
        fetchProducts()
      } else {
        toast.error('Erreur lors de la suppression')
      }
    } catch (err) {
      console.error(err)
      toast.error('Erreur réseau')
    }
    setLoading(false)
  }

  const getCategoryTitle = id =>
    categories?.find(c => c.id === id)?.title || '—'

  const downloadTemplate = () => {
    const template = `titre,description,prix,quantite,couleur,categorie,premium,file_url,demo_url,image_url\n"Mon Super Script","Description du produit",19.99,5,#3498db,Scripts,true,https://example.com/script.zip,https://demo.example.com,https://example.com/image.png\n`
    const blob = new Blob([`\uFEFF${template}`], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'modele-produits.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImportSubmit = async e => {
    e.preventDefault()
    if (!importFile) {
      toast.error('Sélectionnez un fichier CSV')
      return
    }
    setImporting(true)
    setImportResult(null)
    try {
      const formData = new FormData()
      formData.append('csv', importFile)
      const res = await fetch('/api/admin/import', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok) {
        setImportResult(data)
        if (data.imported > 0) fetchProducts()
        toast.success(`${data.imported} produit(s) importé(s)`)
      } else {
        toast.error(data.message || 'Erreur lors de l\'import')
        setImportResult({ error: data.message })
      }
    } catch (err) {
      console.error(err)
      toast.error('Erreur réseau')
    }
    setImporting(false)
  }

  const filteredProducts = products.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  )

  if (!authed) return null

  return (
    <Layout navigationPaths={navigationItems[0]?.metadata}>
      <PageMeta
        title={'Admin Produits | Script Marketplace'}
        description={'Gestion des produits'}
      />
      <div className={cn('section-pt80', styles.section)}>
        <div className={cn('container', styles.container)}>
          <div className={styles.row} style={{ marginBottom: 24 }}>
            <h1 className={cn('h3', styles.title)} style={{ marginBottom: 0 }}>
              Admin - Gestion des Produits ({products.length})
            </h1>
            <div className={styles.btns}>
              <button
                type="button"
                className={cn('button-stroke', styles.btn)}
                onClick={() => setImportOpen(prev => !prev)}
              >
                {importOpen ? 'Fermer l\'import' : 'Importer CSV'}
              </button>
              {importOpen && (
                <button
                  type="button"
                  className={cn('button-stroke', styles.btn)}
                  onClick={downloadTemplate}
                >
                  Télécharger le modèle
                </button>
              )}
            </div>
          </div>

          {importOpen && (
            <div className={styles.importSection}>
              <h2 className={styles.subtitle}>Import en masse (CSV)</h2>
              <form onSubmit={handleImportSubmit} className={styles.importForm}>
                <div className={styles.field}>
                  <label className={styles.label}>Fichier CSV *</label>
                  <input
                    className={styles.input}
                    type="file"
                    accept=".csv,text/csv"
                    onChange={e => {
                      setImportFile(e.target.files[0] || null)
                      setImportResult(null)
                    }}
                  />
                </div>
                <div className={styles.btns} style={{ marginTop: 16 }}>
                  <button type="submit" className={cn('button', styles.btn)} disabled={importing}>
                    {importing ? 'Import en cours...' : 'Importer'}
                  </button>
                </div>
              </form>
              <p className={styles.hint} style={{ marginTop: 16 }}>
                Colonnes : <b>titre*</b>, description, prix, quantite, couleur,{' '}
                <b>categorie*</b> (nom ou slug), premium, file_url, demo_url, image_url.
                Les images sont téléchargées depuis leurs URLs et uploadées automatiquement.
                Séparez plusieurs images par <b>|</b> (la 1ère devient la couverture).
              </p>
              {importResult?.error && (
                <p className={styles.importError} style={{ color: '#e74c3c' }}>
                  {importResult.error}
                </p>
              )}
              {importResult?.total !== undefined && (
                <div className={styles.importResult}>
                  <p>
                    <b>{importResult.imported}</b> importé(s) / <b>{importResult.failed}</b>{' '}
                    en échec (total : {importResult.total})
                  </p>
                  {importResult.failed > 0 && (
                    <ul className={styles.importErrors}>
                      {importResult.results
                        .filter(r => !r.ok)
                        .map((r, i) => (
                          <li key={i}>
                            Ligne {r.row} — {r.title} : {r.error}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.subtitle}>
              {form.id ? 'Modifier le produit' : 'Ajouter un produit'}
            </h2>

            <div className={styles.imageSection}>
              <label className={styles.label}>
                Images du produit — la 1ère sert de couverture
              </label>
              <div className={styles.gallery}>
                {form.images.map((img, index) => (
                  <div
                    key={img.id || `uploading-${index}`}
                    className={cn(styles.tile, img.uploading && styles.tileUploading)}
                  >
                    {img.url && (
                      <Image
                        src={img.url}
                        alt="Aperçu"
                        fill
                        sizes="120px"
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                    {index === 0 && !img.uploading && (
                      <span className={styles.coverBadge}>Couverture</span>
                    )}
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => handleRemoveImage(index)}
                      disabled={uploading}
                      title="Supprimer"
                    >
                      ✕
                    </button>
                    {img.uploading && (
                      <span className={styles.tileUploadingLabel}>Upload...</span>
                    )}
                  </div>
                ))}
                <label
                  className={cn(styles.tile, styles.addTile)}
                  title="Ajouter une image"
                >
                  <input
                    type="file"
                    name="images"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleImagesChange}
                    className={styles.fileInput}
                    disabled={uploading}
                    multiple
                  />
                  <span className={styles.addLabel}>
                    {uploading ? 'Upload...' : '+ Ajouter'}
                  </span>
                </label>
              </div>
              <label className={styles.check}>
                <input
                  type="checkbox"
                  name="watermark"
                  checked={form.watermark}
                  onChange={handleChange}
                />
                Appliquer un filigrane
              </label>
              <p className={styles.hint}>
                JPEG, PNG, WebP, GIF — redimensionnées et optimisées côté client
                (max 1600px), filigrane appliqué avant upload.
              </p>
            </div>

            <div className={styles.grid}>
              <div className={styles.field}>
                <label className={styles.label}>Titre *</label>
                <input
                  className={styles.input}
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Nom du produit"
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Catégorie *</label>
                <select
                  className={styles.input}
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">— Choisir —</option>
                  {categories?.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Prix ($)</label>
                <input
                  className={styles.input}
                  type="number"
                  step="0.01"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Quantité</label>
                <input
                  className={styles.input}
                  type="number"
                  name="count"
                  value={form.count}
                  onChange={handleChange}
                  placeholder="1"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Couleur</label>
                <input
                  className={styles.input}
                  type="color"
                  name="color"
                  value={form.color}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>URL Démo</label>
                <input
                  className={styles.input}
                  type="url"
                  name="demo_url"
                  value={form.demo_url}
                  onChange={handleChange}
                  placeholder="https://demo.example.com"
                />
              </div>
              <div className={cn(styles.field, styles.fieldFull)}>
                <label className={styles.label}>URL Fichier</label>
                <input
                  className={styles.input}
                  type="url"
                  name="file_url"
                  value={form.file_url}
                  onChange={handleChange}
                  placeholder="https://fichiers.example.com/produit.zip"
                />
              </div>
              <div className={cn(styles.field, styles.fieldFull)}>
                <label className={styles.label}>Description</label>
                <textarea
                  className={styles.textarea}
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Description du produit..."
                />
              </div>
            </div>
            <div className={styles.row}>
              <label className={styles.check}>
                <input
                  type="checkbox"
                  name="is_premium"
                  checked={form.is_premium}
                  onChange={handleChange}
                />
                Produit Premium (nécessite abonnement)
              </label>
              <div className={styles.btns}>
                {form.id && (
                  <button
                    type="button"
                    className={cn('button-stroke', styles.btn)}
                    onClick={() => setForm(emptyForm)}
                  >
                    Annuler
                  </button>
                )}
                <button type="submit" className={cn('button', styles.btn)} disabled={loading}>
                  {loading ? '...' : form.id ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </div>
          </form>

          <div className={styles.search}>
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher un produit..."
            />
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Titre</th>
                  <th>Catégorie</th>
                  <th>Prix</th>
                  <th>Type</th>
                  <th>Démo</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(p => (
                  <tr key={p.id}>
                    <td>
                      {p.image_id ? (
                        <Image
                          src={fileUrl(p.image_id)}
                          alt={p.title}
                          width={48}
                          height={32}
                          className={styles.thumb}
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <span className={styles.noThumb}>—</span>
                      )}
                    </td>
                    <td className={styles.nameCell}>{p.title}</td>
                    <td>{getCategoryTitle(p.category_id)}</td>
                    <td>${p.price}</td>
                    <td>
                      <span
                        className={cn(
                          styles.badge,
                          p.is_premium ? styles.premium : styles.free
                        )}
                      >
                        {p.is_premium ? 'Premium' : 'Gratuit'}
                      </span>
                    </td>
                    <td>
                      {p.metadata?.demo_url ? (
                        <a
                          href={p.metadata.demo_url}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.demoLink}
                        >
                          Démo
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className={styles.actions}>
                      <button
                        className={cn('button-small', styles.editBtn)}
                        onClick={() => handleEdit(p)}
                      >
                        Modifier
                      </button>
                      <button
                        className={cn('button-small', styles.deleteBtn)}
                        onClick={() => handleDelete(p)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
                {!filteredProducts.length && (
                  <tr>
                    <td colSpan={7} className={styles.empty}>
                      Aucun produit trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminProducts

export async function getServerSideProps() {
  const navigationItems = (await getAllDataByType('navigation')) || []
  const categories = (await getAllDataByType('categories')) || []
  return {
    props: { navigationItems, categories },
  }
}