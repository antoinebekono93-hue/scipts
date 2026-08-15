import React, { useState, useEffect, useCallback, useRef } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useStateContext } from '../utils/context/StateContext'
import useDebounce from '../utils/hooks/useDebounce'
import useFetchData from '../utils/hooks/useFetchData'
import { getAllDataByType, getDataByCategory } from '../lib/nhost'

import Layout from '../components/Layout'
import Icon from '../components/Icon'
import Card from '../components/Card'
import Dropdown from '../components/Dropdown'
import priceRange from '../utils/constants/priceRange'
import handleQueryParams from '../utils/queryParams'
import { OPTIONS } from '../utils/constants/appConstants'

import styles from '../styles/pages/Search.module.sass'
import { PageMeta, JsonLd } from '../components/Meta'
import {
  buildCategoryJsonLd,
  buildItemListJsonLd,
  truncate,
} from '../lib/seo'

const Search = ({ categoriesGroup, navigationItems, categoryData, categoryTypes }) => {
  const { query, push } = useRouter()
  const { categories } = useStateContext()

  const { data: searchResult, fetchData } = useFetchData(
    categoryData?.length ? categoryData : []
  )

  const categoriesTypeData = categoriesGroup['type'] || categories['type']

  const activeCategory = categoryTypes?.find(
    c => c.slug === (query['category'] || '') || c.id === (query['category'] || '')
  )
  const pageTitle = activeCategory
    ? `${activeCategory.title} — Scripts et templates premium | Script Marketplace`
    : 'Rechercher — Scripts PHP, plugins WordPress, WHMCS | Script Marketplace'
  const pageDescription = activeCategory
    ? `Découvrez et téléchargez les scripts ${activeCategory.title} premium du catalogue Script Marketplace : PHP, WordPress, WHMCS et applications web.`
    : 'Recherchez parmi des milliers de scripts PHP, plugins WordPress, modules WHMCS et applications web premium sur Script Marketplace.'
  const canonicalPath = activeCategory
    ? `/search?category=${activeCategory.slug}`
    : '/search'
  const pageJsonLd = activeCategory
    ? buildCategoryJsonLd(activeCategory, searchResult, canonicalPath)
    : buildItemListJsonLd(searchResult, canonicalPath)

  const [search, setSearch] = useState(query['search'] || '')
  const debouncedSearchTerm = useDebounce(search, 600)

  const [{ min, max }, setRangeValues] = useState(
    query['min'] || query['max']
      ? { min: query['min'] || 1, max: query['max'] || 100000 }
      : priceRange
  )
  const debouncedMinTerm = useDebounce(min, 600)
  const debouncedMaxTerm = useDebounce(max, 600)

  const [activeIndex, setActiveIndex] = useState(
    query['category'] || ''
  )
  const [option, setOption] = useState(query['color'] || OPTIONS[0])

  const handleChange = ({ target: { name, value } }) => {
    setRangeValues(prevFields => ({
      ...prevFields,
      [name]: value,
    }))
  }

  const handleFilterDataByParams = useCallback(
    async ({
      category = activeIndex,
      color = option,
      min = debouncedMinTerm,
      max = debouncedMaxTerm,
      search = debouncedSearchTerm,
    }) => {
      const params = handleQueryParams({
        category,
        color,
        min: min.trim(),
        max: max.trim(),
        search: search.toLowerCase().trim(),
      })

      push(
        {
          pathname: '/search',
          query: params,
        },
        undefined,
        { shallow: true }
      )

      const filterParam = Object.keys(params).reduce(
        (acc, key) => acc + `&${key}=` + `${params[key]}`,
        ''
      )

      await fetchData(`/api/filter?${filterParam}`)
    },
    [
      activeIndex,
      debouncedSearchTerm,
      debouncedMinTerm,
      debouncedMaxTerm,
      fetchData,
      option,
      push,
    ]
  )

  const getDataByFilterOptions = useCallback(
    async color => {
      setOption(color)
      handleFilterDataByParams({ color })
    },
    [handleFilterDataByParams]
  )

  const handleCategoryChange = useCallback(
    async category => {
      setActiveIndex(category)
      handleFilterDataByParams({ category })
    },
    [handleFilterDataByParams]
  )

  const handleSubmit = e => {
    e.preventDefault()
    handleFilterDataByParams({ search: debouncedSearchTerm })
  }

  useEffect(() => {
    let isMount = true

    if (
      isMount &&
      (debouncedSearchTerm?.length ||
        debouncedMinTerm?.length ||
        debouncedMaxTerm?.length)
    ) {
      handleFilterDataByParams({
        min: debouncedMinTerm,
        max: debouncedMaxTerm,
        search: debouncedSearchTerm,
      })
    } else {
      !categoryData?.length &&
        handleFilterDataByParams({ category: activeIndex })
    }

    return () => {
      isMount = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, debouncedMinTerm, debouncedMaxTerm])

  return (
    <Layout navigationPaths={navigationItems[0]?.metadata}>
      <PageMeta
        title={pageTitle}
        description={pageDescription}
        path={canonicalPath}
      />
      <JsonLd data={pageJsonLd} />
      <div className={cn('section-pt80', styles.section)}>
        <div className={cn('container', styles.container)}>
          <div className={styles.row}>
            <div className={styles.filters}>
              <div className={styles.top}>
                <div className={styles.title}>Search</div>
              </div>
              <div className={styles.form}>
                <div className={styles.label}>Search keyword</div>
                <form
                  className={styles.search}
                  action=""
                  onSubmit={handleSubmit}
                >
                  <input
                    className={styles.input}
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    name="search"
                    placeholder="Search..."
                    required
                  />
                  <button className={styles.result}>
                    <Icon name="search" size="16" />
                  </button>
                </form>
              </div>
              <div className={styles.sorting}>
                <div className={styles.dropdown}>
                  <div className={styles.label}>Select color</div>
                  <Dropdown
                    className={styles.dropdown}
                    value={option}
                    setValue={getDataByFilterOptions}
                    options={OPTIONS}
                  />
                </div>
              </div>
              <div className={styles.range}>
                <div className={styles.label}>Price range</div>
                <div className={styles.prices}>
                  <input
                    className={styles.input}
                    type="text"
                    value={min}
                    onChange={handleChange}
                    name="min"
                    placeholder="MIN"
                    required
                  />
                  <p className={styles.separator}>to</p>
                  <input
                    className={styles.input}
                    type="text"
                    value={max}
                    onChange={handleChange}
                    name="max"
                    placeholder="MAX"
                    required
                  />
                </div>
              </div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.nav}>
                <button
                  className={cn(styles.link, {
                    [styles.active]: '' === activeIndex,
                  })}
                  onClick={() => handleCategoryChange('')}
                >
                  All
                </button>
                {categoriesTypeData &&
                  Object.entries(categoriesTypeData)?.map((item, index) => (
                    <button
                      className={cn(styles.link, {
                        [styles.active]: item[0] === activeIndex,
                      })}
                      onClick={() => handleCategoryChange(item[0])}
                      key={index}
                    >
                      {item[1]}
                    </button>
                  ))}
              </div>
              <div className={styles.list}>
                {searchResult?.length ? (
                  searchResult?.map((x, index) => (
                    <Card className={styles.card} item={x} key={index} />
                  ))
                ) : (
                  <p className={styles.inform}>Try another category!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Search

export async function getServerSideProps({ query }) {
  const navigationItems = (await getAllDataByType('navigation')) || []

  const categoryTypes = (await getAllDataByType('categories')) || []
  const categoriesData = await Promise.all(
    categoryTypes?.map(category => {
      return getDataByCategory(category?.id)
    })
  )

  const categoryData = query?.hasOwnProperty('category')
    ? await getDataByCategory(query['category'])
    : []

  const categoriesGroups = categoryTypes?.map(({ id }, index) => {
    return { [id]: categoriesData[index] }
  })

  const categoriesType = categoryTypes?.reduce((arr, { title, id }) => {
    return { ...arr, [id]: title }
  }, {})

  const categoriesGroup = { groups: categoriesGroups, type: categoriesType }

  return {
    props: { navigationItems, categoriesGroup, categoryData, categoryTypes },
  }
}
