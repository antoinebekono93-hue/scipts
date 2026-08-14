import React, { useState, useEffect, useCallback } from 'react'
import cn from 'classnames'
import toast from 'react-hot-toast'
import Layout from '../../components/Layout'
import { useStateContext } from '../../utils/context/StateContext'
import { getAllDataByType } from '../../lib/nhost'
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
}

const AdminProducts = ({ navigationItems, categories }) => {
  const { cosmicUser } = useStateContext()
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

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

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.title || !form.category_id) {
      toast.error('Titre et catégorie sont obligatoires')
      return
    }

    setLoading(true)
    const isEdit = !!form.id
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

  const filteredProducts = products.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Layout navigationPaths={navigationItems[0]?.metadata}>
      <PageMeta
        title={'Admin Produits | Script Marketplace'}
        description={'Gestion des produits'}
      />
      <div className={cn('section-pt80', styles.section)}>
        <div className={cn('container', styles.container)}>
          <h1 className={cn('h3', styles.title)}>
            Admin - Gestion des Produits ({products.length})
          </h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.subtitle}>
              {form.id ? 'Modifier le produit' : 'Ajouter un produit'}
            </h2>
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
                    <td colSpan={6} className={styles.empty}>
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