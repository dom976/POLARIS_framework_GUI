import React, { useState, useEffect } from 'react';

function cardscript() {
  // Stato per memorizzare i dati delle flashcards
  const [flashcards, setFlashcards] = useState([]);
  // Stato per memorizzare la categoria filtrata
  const [filter, setFilter] = useState('All');

  // Effetto per caricare i dati delle flashcards
  useEffect(() => {
    fetch('../csvjson.json')
      .then(response => response.json())
      .then(data => {
        const processedData = processFlashcardsData(data);
        setFlashcards(processedData);
      })
      .catch(error => console.error('Errore nel caricamento del file JSON:', error));
  }, []);

  // Funzione per processare i dati iniziali e organizzarli per descrizione
  function processFlashcardsData(data) {
    const uniqueDescriptions = new Map();

    data.forEach(item => {
      let key = item.Description;
      if (item.Category === 'Explainability' && item['Explanation Goal']) {
        key = item['Explanation Goal'];
      }

      if (!uniqueDescriptions.has(key)) {
        uniqueDescriptions.set(key, {
          description: key,
          categories: new Set(),
          sdlcPhases: new Map(),
        });
      }

      const entry = uniqueDescriptions.get(key);
      entry.categories.add(item.Category);
      if (!entry.sdlcPhases.has(item['SDLC Phase'])) {
        entry.sdlcPhases.set(item['SDLC Phase'], item.Action);
      }
    });

    return Array.from(uniqueDescriptions.values());
  }

  // Funzione per gestire il cambiamento del filtro
  const handleFilterChange = (category) => {
    setFilter(category);
  };

  return (
    <div>
      <div>
        {/* Esempio di UI per selezionare un filtro */}
        <select onChange={(e) => handleFilterChange(e.target.value)} value={filter}>
          <option value="All">Tutte</option>
          {/* Aggiungere qui altre opzioni di filtro basate sui dati */}
        </select>
      </div>
      <div id="flashcard-container">
        {/* Filtrare e mappare le flashcards per la visualizzazione */}
        {flashcards.filter(flashcard => filter === 'All' || flashcard.categories.has(filter)).map((flashcard, index) => (
          <div key={index} className="flashcard">
            {/* Renderizzare i dettagli della flashcard qui */}
            <div className="preview">{flashcard.description}</div>
            {/* Aggiungere altri dettagli della flashcard qui */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default cardscript;
