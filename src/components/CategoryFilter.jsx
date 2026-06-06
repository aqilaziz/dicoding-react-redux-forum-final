export default function CategoryFilter ({ categories, activeCategory, onChange }) {
  return (
    <aside className="panel">
      <h2>Kategori</h2>
      <div className="filter-list">
        <button
          className={activeCategory === 'all' ? 'active' : ''}
          type="button"
          onClick={() => onChange('all')}
        >
          Semua thread
        </button>
        {categories.map((category) => (
          <button
            className={activeCategory === category ? 'active' : ''}
            key={category}
            type="button"
            onClick={() => onChange(category)}
          >
            #{category}
          </button>
        ))}
      </div>
    </aside>
  )
}
