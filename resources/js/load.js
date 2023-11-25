(function () {
    // Fetches the .env file content
    fetch('.env')
      .then(response => response.text())
      .then(content => {
        const lines = content.split('\n');
  
        lines.forEach(line => {
          const [key, value] = line.split('=');
  
          if (key && value) {
            window[key.trim()] = value.trim();
          }
        });
      })
      .catch(error => console.error('Error loading .env:', error));
  })();