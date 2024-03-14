import React, { useState, useEffect } from 'react';
import FadeIn from 'react-fade-in';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './catalogue.css'; // Importa i tuoi stili CSS

const Catalogue = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPhase, setFilterPhase] = useState('All');
  const [selectedPhase, setSelectedPhase] = useState({});
  const [expandedFlashcard, setExpandedFlashcard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategoryButton, setActiveCategoryButton] = useState('All'); // Aggiunto stato per il bottone attivo della categoria
  const [activePhaseButton, setActivePhaseButton] = useState('All'); // Aggiunto stato per il bottone attivo della fase

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

  const handleCategoryFilter = (category) => {
    setFilterCategory(category);
    setActiveCategoryButton(category); // Imposta il bottone attivo per la categoria
    AOS.refresh();
  };

  const handlePhaseFilter = (phase) => {
    setFilterPhase(phase);
    setActivePhaseButton(phase); // Imposta il bottone attivo per la fase
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
      <p key={index} className="flashcard-content">
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

  const categoryDarkColors = {
    'All': '#cccccc',
    'Security': '#6699cc',
    'Privacy': '#66cc66',
    'Fairness': '#cc99cc',
    'Explainability': '#ffcc99'
  };

  const filteredFlashcards = flashcards.filter(flashcard => {
    const categoryMatch = filterCategory === 'All' || flashcard.Category === filterCategory;
    const phaseMatch = filterPhase === 'All' || Object.keys(flashcard.phases).some(phase => phase === filterPhase);
    const searchTermMatch = searchTerm === '' || Object.values(flashcard).join('').toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && phaseMatch && searchTermMatch;
  });

  return (
    <body>
      <div className="container">
        <div className="buttons-container">
          {Object.keys(categoryColors).map(category => (
            <button 
              key={category} 
              onClick={() => handleCategoryFilter(category)} 
              className={activeCategoryButton === category ? 'button-active' : ''}
              style={{ 
                backgroundColor: categoryColors[category],
                boxShadow: `inset 0 0 5px ${activeCategoryButton === category ? categoryDarkColors[category] : 'transparent'}`
              }}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="buttons-container">
          <button 
            onClick={() => handlePhaseFilter('All')} 
            className={activePhaseButton === 'All' ? 'button-active' : ''}
          >
            All Phases
          </button>
          <button 
            onClick={() => handlePhaseFilter('Deployment')} 
            className={activePhaseButton === 'Deployment' ? 'button-active' : ''}
          >
            Deployment
          </button>
          <button 
            onClick={() => handlePhaseFilter('Design')} 
            className={activePhaseButton === 'Design' ? 'button-active' : ''}
          >
            Design
          </button>
          <button 
            onClick={() => handlePhaseFilter('Testing')} 
            className={activePhaseButton === 'Testing' ? 'button-active' : ''}
          >
            Testing
          </button>
          <button 
            onClick={() => handlePhaseFilter('RE')} 
            className={activePhaseButton === 'RE' ? 'button-active' : ''}
          >
            Requirements Elicitation
          </button>
          <button 
            onClick={() => handlePhaseFilter('Monitoring')} 
            className={activePhaseButton === 'Monitoring' ? 'button-active' : ''}
          >
            Monitoring
          </button>
          <button 
            onClick={() => handlePhaseFilter('Development')} 
            className={activePhaseButton === 'Development' ? 'button-active' : ''}
          >
            Development
          </button>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flashcards-container">
          {filteredFlashcards.map((flashcard, index) => (
            <div
              key={index}
              className="flashcard"
              style={{ backgroundColor: categoryColors[flashcard.Category], width: expandedFlashcard === flashcard.id ? '100%' : 'calc(33% - 20px)' }}
              onClick={() => toggleExpansion(flashcard.id)}
            >
              <h4>{flashcard.Category}</h4>
              <div className="flashcard-content">
                {expandedFlashcard === flashcard.id ? (flashcard.Category === 'Explainability' ? formatText(flashcard['Explanation Goal']) : formatText(flashcard.fullDescription)) : (flashcard.Category === 'Explainability' ? formatText(truncateExplanationGoal(flashcard.previewExplanationGoal)) : formatText(truncateDescription(flashcard.previewDescription)))}
              </div>
              {expandedFlashcard === flashcard.id && (
                <div onClick={(e) => e.stopPropagation()}>
                  <div className="phases-container">SDLC Phase:</div>
                  {Object.entries(flashcard.phases).map(([phase, action], idx) => (
                    <button
                      key={idx}
                      className="phase-button"
                      onClick={() => handlePhaseSelection(phase, flashcard.id)}
                    >
                      {handlePhaseName(phase)}
                    </button>
                  ))}
                  <p className="action-text">Action: {formatText(flashcard.phases[selectedPhase[flashcard.id]])}</p>
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
