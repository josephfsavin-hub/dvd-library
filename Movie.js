class Movie {
  constructor(data) {
    // Assign all spreadsheet fields to properties (normalized keys)
    this.title = data.title || '';
    this.alternateTitle = data.alternate_title || '';
    this.dvdCollectionTitle = data.dvd_collection_title || '';
    this.type = data.type || '';
    this.genres = this._parseList(data.genres);  // array of genres
    this.subgenres = this._parseList(data['subgenre(s)']);
    this.directors = this._parseList(data['director(s)']);
    this.writers = this._parseList(data['writer(s)']);
    this.mainActors = this._parseList(data['main_actor(s)']);
    this.supportingActors = this._parseList(data['supporting_actor(s)']);
    this.languages = this._parseList(data.language);
    this.country = data.country || '';
    this.year = data.year || '';
    this.runtimeMin = data['runtime_(min)'] || '';
    this.description = data.description || '';
    this.imdbUrl = data.imdb_url || '';
    this.youtubeTrailerUrl = data.youtube_trailer_url || '';
    this.watched = this._toBoolean(data.watched);
    this.liked = this._toBoolean(data['liked_(yes/no)']);
    this.priority = data.priority || '';
    this.lastWatched = data.last_watched || '';
    this.addDate = data.add_date || '';
    this.shuffleEligible = this._toBoolean(data['shuffle_eligible_(yes/no)']);
    this.boxArtImageUrl = data.box_art_image_url || '';
    this.notes = data.notes || '';
  }

  // Private method to parse comma-separated lists into arrays
  _parseList(field) {
    if (!field) return [];
    if (Array.isArray(field)) return field; // already an array
    return field.split(',').map(item => item.trim()).filter(Boolean);
  }

  // Private method to normalize "Yes"/"No" or truthy/falsy to boolean
  _toBoolean(field) {
    if (!field) return false;
    if (typeof field === 'boolean') return field;
    const val = field.toString().toLowerCase();
    return val === 'yes' || val === 'true' || val === '1';
  }

  // Getters
  getTitle() {
    return this.title;
  }

  getAlternateTitle() {
    return this.alternateTitle;
  }

  getDvdCollectionTitle() {
    return this.dvdCollectionTitle;
  }

  getType() {
    return this.type;
  }

  getGenres() {
    return this.genres;
  }

  getSubgenres() {
    return this.subgenres;
  }

  getDirectors() {
    return this.directors;
  }

  getWriters() {
    return this.writers;
  }

  getMainActors() {
    return this.mainActors;
  }

  getSupportingActors() {
    return this.supportingActors;
  }

  getLanguages() {
    return this.languages;
  }

  getCountry() {
    return this.country;
  }

  getYear() {
    return this.year;
  }

  getRuntime() {
    return this.runtimeMin;
  }

  getDescription() {
    return this.description;
  }

  getImdbUrl() {
    return this.imdbUrl;
  }

  getYoutubeTrailerUrl() {
    return this.youtubeTrailerUrl;
  }

  isWatched() {
    return this.watched;
  }

  isLiked() {
    return this.liked;
  }

  getPriority() {
    return this.priority;
  }

  getLastWatched() {
    return this.lastWatched;
  }

  getAddDate() {
    return this.addDate;
  }

  isShuffleEligible() {
    return this.shuffleEligible;
  }

  getBoxArtImageUrl() {
    return this.boxArtImageUrl;
  }

  getNotes() {
    return this.notes;
  }

  // Setters (only a few examples, add as needed)
  setWatched(value) {
    this.watched = Boolean(value);
  }

  setLiked(value) {
    this.liked = Boolean(value);
  }

  setPriority(value) {
    this.priority = value;
  }

  setLastWatched(dateStr) {
    this.lastWatched = dateStr;
  }

  // Example helper method: returns genres as a formatted string
  getGenresString() {
    return this.genres.join(', ');
  }

  // Example helper method: returns formatted description summary (first 100 chars)
  getShortDescription(length = 100) {
    if (!this.description) return '';
    return this.description.length > length
      ? this.description.substring(0, length) + '...'
      : this.description;
  }
}
