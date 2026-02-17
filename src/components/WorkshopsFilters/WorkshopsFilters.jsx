
import "./WorkshopsFilters.css"

const WorkshopsFilters = ({filters, onChange,onReset}) => {
  return (
    <div className="container-toolbar">
        <input
            className="input-filter-search"
            placeholder="Search workshops or instructors..."
            value={filters.query}
            onChange={(evt) => onChange((previousFilters) =>({...previousFilters, query: evt.target.value}))}
        />

        <select
            className="input-filter-select"
            value={filters.art_type}
            onChange={(evt) => onChange((previousFilters) =>({ ...previousFilters, art_type: evt.target.value}))}
        >
            <option value="all">All categories</option>
            <option value='watercolor_painting'>Watercolor Painting</option>
            <option value='oil_painting'>Oil Painting</option>
            <option value='acrylic_painting'>Acrylic Painting</option>
            <option value='drawing'>Drawing</option>
            <option value='charcoal_pastel_drawing'>Charcoal Pastel Drawing</option>
            <option value='ink_drawing_calligraphy'>Ink Drawing Calligraphy</option>
            <option value='mixed_media'>Mixed Media</option>
            <option value='ceramics_pottery'>Ceramics Pottery</option>
            <option value='clay_sculpture'>Clay Sculpture</option>
            <option value='wood_sculpture_carving'>Wood Sculpture Carving</option>
            <option value='mosaic_art'>Mosaic Art</option>
        </select>

        <select
            className="input-filter-select"
            value={filters.level}
            onChange={(e) => onChange((previousFilters)=> ({ ...previousFilters, level: e.target.value}))}
        >
            <option value="all">All levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="all_levels">All levels</option>
        </select>

        <button className="button-filter-reset" type="button" onClick={onReset}>
            Reset
        </button>
    </div>
  );
};

export default WorkshopsFilters;
