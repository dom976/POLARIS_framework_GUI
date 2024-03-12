import React, { useState, useEffect } from 'react';
import FadeIn from 'react-fade-in';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Catalogue = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [filter, setFilter] = useState('All');
  const [selectedPhase, setSelectedPhase] = useState({});
  const [expandedFlashcard, setExpandedFlashcard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/csvjson.json')
      .then(response => response.json())
      .then(data => {
        // Sostituisci il carattere speciale '�' con l'apostrofo "'" in tutti i campi del JSON
        const sanitizedData = data.map(item => {
          const sanitizedItem = {};
          for (let key in item) {
            sanitizedItem[key] = item[key].replace(/�/g, "'"); // Sostituisci tutti i caratteri '�' con l'apostrofo "'"
          }
          return sanitizedItem;
        });

        const groupedByCategory = sanitizedData.reduce((acc, item) => {
          const id = item.Category === 'Explainability' ? item['Explanation Goal'].substring(0, 100) : item.Description.substring(0, 100);
          acc[id] = acc[id] || {
            ...item,
            id,
            fullDescription: item.Description,
            previewDescription: item.Category !== 'Explainability' ? truncateDescription(item.Description) : '',
            previewExplanationGoal: item.Category === 'Explainability' ? truncateExplanationGoal(item['Explanation Goal']) : '',
            phases: {}
          };
          acc[id].phases[item['SDLC Phase']] = item.Action;
          return acc;
        }, {});

        const initialPhases = Object.values(groupedByCategory).reduce((acc, item) => {
          acc[item.id] = Object.keys(item.phases)[0];
          return acc;
        }, {});

        setFlashcards(Object.values(groupedByCategory));
        setSelectedPhase(initialPhases);
      })
      .catch(error => console.error('Error loading JSON file:', error));

    AOS.init({
      once: true,
    });
  }, []);

  const toggleExpansion = (id) => {
    setExpandedFlashcard(expandedFlashcard === id ? null : id);
  };

  const handlePhaseSelection = (phase, id) => {
    setSelectedPhase(prev => ({
      ...prev,
      [id]: phase,
    }));
  };

  const handleFilterChange = (category) => {
    setFilter(category);
    // Dopo aver cambiato il filtro, chiamiamo AOS.refresh() per rilevare nuovamente gli elementi e riapplicare l'effetto
    AOS.refresh();
  };

  const handlePhaseName = (name) => {
    if (name === 'RE') {
      return 'Requirements Elicitation';
    }
    return name;
  };

  const formatText = (text) => {
    // Dividi il testo in paragrafi quando incontra un salto di riga (\n)
    const paragraphs = text.split('\n');
    return paragraphs.map((paragraph, index) => (
      <p key={index} style={{ marginBottom: '5px', fontSize: '14px', whiteSpace: 'pre-wrap', fontFamily: 'Lucida Fax' }}>
        {paragraph}
      </p>
    ));
  };

  const truncateDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 7) {
      return words.slice(0, 7).join(' ') + '...';
    }
    return description;
  };

  const truncateExplanationGoal = (explanationGoal) => {
    const words = explanationGoal.split(' ');
    if (words.length > 7) {
      return words.slice(0, 7).join(' ') + '...';
    }
    return explanationGoal;
  };

  const categoryColors = {
    'All': '#ffffff',
    'Security': '#cce5ff',
    'Privacy': '#ccffcc',
    'Fairness': '#ecd6f4',
    'Explainability': '#ffebd9'
  };

  const filteredFlashcards = flashcards.filter(flashcard => {
    const values = Object.values(flashcard).join('').toLowerCase();
    return values.includes(searchTerm.toLowerCase());
  });

  return (
    <body>
      <div style={{ padding: '20px', width: '100%' }}>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <button onClick={() => handleFilterChange('All')} style={{ backgroundColor: categoryColors['All'], borderRadius: '20px', padding: '10px 20px', marginRight: '10px', fontSize: '16px', fontWeight: 'bold', fontFamily: 'Lucida Fax' }}>All</button>
          <button onClick={() => handleFilterChange('Security')} style={{ backgroundColor: categoryColors['Security'], borderRadius: '20px', padding: '10px 20px', marginRight: '10px', fontSize: '16px', fontWeight: 'bold', fontFamily: 'Lucida Fax' }}>Security</button>
          <button onClick={() => handleFilterChange('Privacy')} style={{ backgroundColor: categoryColors['Privacy'], borderRadius: '20px', padding: '10px 20px', marginRight: '10px', fontSize: '16px', fontWeight: 'bold', fontFamily: 'Lucida Fax' }}>Privacy</button>
          <button onClick={() => handleFilterChange('Fairness')} style={{ backgroundColor: categoryColors['Fairness'], borderRadius: '20px', padding: '10px 20px', marginRight: '10px', fontSize: '16px', fontWeight: 'bold', fontFamily: 'Lucida Fax' }}>Fairness</button>
          <button onClick={() => handleFilterChange('Explainability')} style={{ backgroundColor: categoryColors['Explainability'], borderRadius: '20px', padding: '10px 20px', marginRight: '10px', fontSize: '16px', fontWeight: 'bold', fontFamily: 'Lucida Fax' }}>Explainability</button>
        </div>
        <div style={{ position: 'relative', width: '100%', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search"
            style={{
              padding: '8px',
              fontSize: '14px',
              width: 'calc(50% - 32px)',
              borderRadius: '10px',
              border: '1px solid #ccc',
              margin: '0 auto',
              display: 'block',
            }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div data-aos="fade-up" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', margin: '0 20px', width: '100%' }}>
          {(searchTerm === '' ? flashcards : filteredFlashcards)
            .filter(flashcard => filter === 'All' || flashcard.Category === filter)
            .map((flashcard, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #ccc',
                  padding: '5px',
                  borderRadius: '5px',
                  position: 'relative',
                  width: expandedFlashcard === flashcard.id ? '100%' : 'calc(33% - 20px)',
                  transition: 'width 0.3s ease-in-out',
                  backgroundColor: categoryColors[flashcard.Category],
                }}
                onClick={() => toggleExpansion(flashcard.id)}
              >
                <h4>{flashcard.Category}</h4>
                <div style={{ fontSize: '14px', margin: '5px 0', fontFamily: 'Lucida Fax' }}>
                  {expandedFlashcard === flashcard.id ? (flashcard.Category === 'Explainability' ? formatText(flashcard['Explanation Goal']) : formatText(flashcard.fullDescription)) : (flashcard.Category === 'Explainability' ? formatText(truncateExplanationGoal(flashcard.previewExplanationGoal)) : formatText(truncateDescription(flashcard.previewDescription)))}
                </div>
                {expandedFlashcard === flashcard.id && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <div style={{ marginBottom: '5px', fontSize: '14px' }}>SDLC Phase:</div>
                    {Object.entries(flashcard.phases).map(([phase, action], idx) => (
                      <button
                        key={idx}
                        style={{ marginRight: '5px', marginBottom: '5px', fontSize: '14px' }}
                        onClick={() => handlePhaseSelection(phase, flashcard.id)}
                      >
                        {handlePhaseName(phase)}
                      </button>
                    ))}
                    <p style={{ fontSize: '14px', margin: '5px 0' }}>Action: {formatText(flashcard.phases[selectedPhase[flashcard.id]])}</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </body>
  );
};

export default Catalogue;
