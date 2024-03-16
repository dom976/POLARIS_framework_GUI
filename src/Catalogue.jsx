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

  const handlePhaseName = (name) => {
    if (name === 'RE') {
      return 'Requirements Elicitation';
    }
    return name;
  };
  

  const categoryColors = {
    'All': '#ffffff',
    'Security': '#86e2ff',
    'Privacy': '#9aff9a',
    'Fairness': '#e290fd',
    'Explainability': '#ffd771'
  };

  const phaseColors = {
    'All' : '#ffffff',
    'Design' : '#ffd1d7',
    'Development' : '#ffd1d7',
    'Deployment' : '#ffd1d7',
    'Testing' : '#ffd1d7',
    'Monitoring': '#ffd1d7',
    'RE': '#ffd1d7'
  };

  const hoverColorsPhase = {
    'Design' : '#fc5c5c',
    'Development' : '#fc5c5c',
    'Deployment' : '#fc5c5c',
    'Testing' : '#fc5c5c',
    'Monitoring': '#fc5c5c',
    'RE': '#fc5c5c'
  };

  const categoryDarkColors = {
    'All': '#cccccc',
    'Security': '#95a3f1',
    'Privacy': '#66cc66',
    'Fairness': '#cc99cc',
    'Explainability': '#ffcc99'
  };

  const hoverColors = {
    'Security': '#86a4ff', // Colore di hover per 'Security'
    'Privacy': '#00f496',   // Colore di hover per 'Privacy'
    'Fairness': '#c23bec',  // Colore di hover per 'Fairness'
    'Explainability': '#ff8f71' // Colore di hover per 'Explainability'
  };

  const phaseButtons = ['All', 'Deployment', 'Design', 'Testing', 'RE', 'Monitoring', 'Development'];

  const filteredFlashcards = flashcards.filter(flashcard => {
    const categoryMatch = filterCategory === 'All' || flashcard.Category === filterCategory;
    const phaseMatch = filterPhase === 'All' || Object.keys(flashcard.phases).some(phase => phase === filterPhase);
    const searchTermMatch = searchTerm === '' || Object.values(flashcard).join('').toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && phaseMatch && searchTermMatch;
  });

  const handleMouseEnter2 = (phase) => {
    const button = document.querySelector(`.${phase}`);
    if (button && activePhaseButton !== phase) {
      button.style.backgroundColor = hoverColorsPhase[phase];
    }
  };

  const handleMouseLeave2 = (phase) => {
    const button = document.querySelector(`.${phase}`);
    if (button && activePhaseButton !== phase) {
      button.style.backgroundColor = phaseColors[phase];
    }
  };

  const handleMouseEnter = (category) => {
    const button = document.querySelector(`.${category}`);
    if (button && activeCategoryButton !== category) {
      button.style.backgroundColor = hoverColors[category];
    }
  };

  const handleMouseLeave = (category) => {
    const button = document.querySelector(`.${category}`);
    if (button && activeCategoryButton !== category) {
      button.style.backgroundColor = categoryColors[category];
    }
  };

  const handleCategoryFilter = (category) => {
    // Ciclo attraverso tutti i bottoni delle categorie e reimposto i loro colori corretti
    Object.keys(categoryColors).forEach((cat) => {
      const button = document.querySelector(`.${cat}`);
      if (button) {
        button.style.backgroundColor = categoryColors[cat];
      }
    });

    // Controllo se il bottone cliccato è già attivo
    const isButtonActive = activeCategoryButton === category;

    // Se il bottone cliccato è già attivo, deseleziono il filtro e il bottone
    if (isButtonActive) {
      setFilterCategory('All');
      setActiveCategoryButton('');
    } else {
      // Imposto il colore del bottone cliccato
      const button = document.querySelector(`.${category}`);
      if (button) {
        button.style.backgroundColor = hoverColors[category];
      }

      setFilterCategory(category);
      setActiveCategoryButton(category);
    }

    AOS.refresh();
  };

  const handlePhaseFilter2 = (phase) => {
    // Ciclo attraverso tutti i bottoni delle fasi e reimposto i loro colori corretti
    Object.keys(phaseColors).forEach((ph) => {
      const button = document.querySelector(`.${ph}`);
      if (button) {
        button.style.backgroundColor = phaseColors[ph];
      }
    });

    // Controllo se il bottone cliccato è già attivo
    const isButtonActive = activePhaseButton === phase;

    // Se il bottone cliccato è già attivo, deseleziono il filtro e il bottone
    if (isButtonActive) {
      setFilterPhase('All');
      setActivePhaseButton('');
    } else {
      // Imposto il colore del bottone cliccato
      const button = document.querySelector(`.${phase}`);
      if (button) {
        button.style.backgroundColor = hoverColorsPhase[phase];
      }

      setFilterPhase(phase);
      setActivePhaseButton(phase);
    }

    AOS.refresh();
  };

  return (
    <FadeIn>
      <body>
        <div className="container">
          <div className="buttons-container">
            {Object.keys(categoryColors).map(category => (
              <button 
                key={category} 
                onClick={() => handleCategoryFilter(category)} 
                onMouseEnter={() => handleMouseEnter(category)} 
                onMouseLeave={() => handleMouseLeave(category)} 
                className={`category-button ${activeCategoryButton === category ? 'button-active' : ''} ${category}`}
                style={{ 
                  backgroundColor: categoryColors[category],
                  border: '1px solid black', // Aggiunto bordo nero
                  cursor: 'pointer'
                }}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="buttons-container">
            {phaseButtons.map(phase => (
              <button 
                key={phase} 
                onClick={() => handlePhaseFilter2(phase)} 
                onMouseEnter={() => handleMouseEnter2(phase)} 
                onMouseLeave={() => handleMouseLeave2(phase)} 
                className={`phase-button ${activePhaseButton === phase ? 'button-active' : ''}  ${phase}`}
                style={{
                  backgroundColor: phaseColors[phase],
                  border: '1px solid black', // Aggiunto bordo nero
                  cursor: 'pointer'
                }}
              >
                {phase === 'RE' ? 'Requirements Elicitation' : phase}
              </button>
            ))}
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
                      <p key={idx} className="phase-info">
                        <strong>{handlePhaseName(phase)}:</strong> {action}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </body>
    </FadeIn>
  );
};

export default Catalogue;
