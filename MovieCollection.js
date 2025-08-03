class MovieCollection {
  constructor() {
    this.movies = [];
  }

  async loadFromGoogleSheetCSV(csvUrl) {
    try {
      const response = await fetch(csvUrl);
      if (!response.ok) throw new Error('Network response not ok');
      const csvText = await response.text();
      this.movies = this.parseCSV(csvText);
      console.log(`Loaded ${this.movies.length} movies.`);
    } catch (error) {
      console.error('Failed to load CSV:', error);
    }
  }

  parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

    const titleIdx = headers.indexOf('title');
    const genreIdx = headers.indexOf('genres');
    const descIdx = headers.indexOf('description');
    const posterIdx = headers.indexOf('box_art_image_url');

    if (titleIdx === -1 || genreIdx === -1 || descIdx === -1 || posterIdx === -1) {
      console.warn('Missing one or more required columns');
      return [];
    }

    const movies = [];

    for (let i = 1; i < lines.length; i++) {
      const row = this.safeSplitCSV(lines[i]);
      // Defensive: skip rows that don’t match header length
      if (row.length !== headers.length) {
        console.warn(`Skipping malformed CSV row ${i + 1}: column count mismatch`);
        continue;
      }

      movies.push({
        title: row[titleIdx],
        genres: row[genreIdx],
        description: row[descIdx],
        posterUrl: row[posterIdx]
      });
    }
    return movies;
  }

  // Simple CSV splitter handling quoted commas
  safeSplitCSV(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let char of line) {
      if (char === '"') inQuotes = !inQuotes;
      else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result.map(s => s.trim().replace(/^"|"$/g, ''));
  }
}

// USAGE EXAMPLE:
// const collection = new MovieCollection();
// collection.loadFromGoogleSheetCSV('YOUR_CSV_URL_HERE').then(() => {
//   console.log(collection.movies);
// });
