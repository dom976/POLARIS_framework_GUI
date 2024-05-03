import React, { useState, useEffect } from 'react';
import FadeIn from 'react-fade-in';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './catalogue.css'; // Importa i tuoi stili CSS

const Catalogue = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [filterCategories, setFilterCategories] = useState(['All']);
  const [filterPhases, setFilterPhases] = useState(['All']);
  const [expandedFlashcard, setExpandedFlashcard] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategoryButtons, setActiveCategoryButtons] = useState(['All']);
  const [activePhaseButtons, setActivePhaseButtons] = useState(['All']);

  useEffect(() => {
    fetch('/Catalogue.json')
      .then(response => response.json())
      .then(data => {
        const sanitizedData = data.map(item => {
          const sanitizedItem = {};
          for (let key in item) {
            sanitizedItem[key] = item[key].replace(/�/g, "'");
          }
          return sanitizedItem;
        });
  
        let actionCounters = {}; // Oggetto per tenere traccia del numero di azioni per ogni ID base
  
        const groupedByCategory = sanitizedData.reduce((acc, item) => {
          // Genera un ID base che non considera l'Action
          const baseId = item.Category + ':' + (item.Category === 'Explainability' ? item['Explanation Goal'].substring(0, 100) : item.Description.substring(0, 100)) + ':' + item['SDLC Phase'];
          
          // Incrementa il contatore per questo ID base o inizializzalo se non esiste
          actionCounters[baseId] = (actionCounters[baseId] || 0) + 1;
          
          // Crea un ID unico che include il contatore di azione
          const uniqueId = `${baseId}:${actionCounters[baseId]}`;
  
          acc[uniqueId] = {
            ...item,
            id: uniqueId,
            fullDescription: item.Description,
            previewDescription: item.Category !== 'Explainability' ? truncateDescription(item.Description) : '',
            previewExplanationGoal: item.Category === 'Explainability' ? truncateExplanationGoal(item['Explanation Goal']) : '',
            phases: { [item['SDLC Phase']]: formatText(item.Action) }
          };
  
          return acc;
        }, {});
  
        setFlashcards(Object.values(groupedByCategory));
        // Qui potresti voler rivedere come gestisci expandedFlashcard se necessario
      })
      .catch(error => console.error('Error loading JSON file:', error));
  
    AOS.init({
      once: true,
    });
  }, []);
  
  

  const toggleExpansion = (id) => {
    setExpandedFlashcard(expandedFlashcard === id ? null : id);
  };

  const formatText = (text) => {
    const paragraphs = text.split('\n');
    return paragraphs.map((paragraph, index) => {
      // Estendo l'espressione regolare per riconoscere anche i tag <a> con gli attributi href
      const linkRegex = /<a href='(https?:\/\/[^\s']+)'>([^<]+)<\/a>|\((https?:\/\/[^\s\(\)]+)\)|\[(https?:\/\/[^\s\[\]]+)\]|https?:\/\/[^\s\(\[\])]+/g;
      let lastIndex = 0;
      const matches = [];
      let match;
      while ((match = linkRegex.exec(paragraph)) !== null) {
        const url = match[1] || match[3] || match[4] || match[0];
        const linkText = match[2] || url; // Usa il testo del link se presente, altrimenti l'URL
        matches.push({
          index: match.index,
          url: url,
          text: linkText,
          isTag: !!match[2] // Se abbiamo catturato il testo del link, significa che è un tag <a>
        });
      }
  
      return (
        <p key={index} style={{ marginBottom: '5px', fontSize: '14px', whiteSpace: 'pre-wrap', fontFamily: 'Lucida Fax' }}>
          {matches.map((match, i) => {
            const textBeforeLink = paragraph.substring(lastIndex, match.index);
            lastIndex = match.index + (match.isTag ? match.text.length + match.url.length + 15 : match.url.length); // Aggiusta lastIndex basandosi su se è un tag o un URL
            return (
              <React.Fragment key={i}>
                {textBeforeLink}
                {match.isTag ? (
                  <a href={match.url} target="_blank" rel="noopener noreferrer">{match.text}</a>
                ) : (
                  <a href={match.url} target="_blank" rel="noopener noreferrer">{match.url}</a>
                )}
              </React.Fragment>
            );
          })}
          {lastIndex < paragraph.length && <span>{paragraph.substring(lastIndex)}</span>}
        </p>
      );
    });
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

  // Definisco i colori per i bottoni delle categorie
  const categoryColors = {
    'All': '#ffffff',
    'Security': '#9da6db',
    'Privacy': '#aecd76',
    'Fairness': '#e290fd',
    'Explainability': '#dbb39d'
  };
  

  // Definisci i colori per i bottoni delle fasi del SDLC
  const phaseColors = {
    'All': '#ffffff',
    'Design': '#d1c4e9',
    'Development': '#d1c4e9',
    'Deployment': '#d1c4e9',
    'Testing': '#d1c4e9',
    'Monitoring': '#d1c4e9',
    'RE': '#d1c4e9'
  };

  // Definisco i colori di sfondo quando i bottoni delle categorie sono attivi
  const hoverColorsCategory = {
    'All': '#ffffff',
    'Security': '#86a4ff',
    'Privacy': '#c5db9d',
    'Fairness': '#e3c4e9',
    'Explainability': '#eddeda'
  };

  const hoverColorsPhase = {
    'All': '#ffffff',
    'Design': '#B39DDB',
    'Development': '#B39DDB',
    'Deployment': '#B39DDB',
    'Testing': '#B39DDB',
    'Monitoring': '#B39DDB',
    'RE': '#B39DDB'
  };

  const phaseButtons = ['All', 'Deployment', 'Design', 'Testing', 'RE', 'Monitoring', 'Development'];

  const filteredFlashcards = flashcards.filter(flashcard => {
    const categoryMatch = filterCategories.includes('All') || filterCategories.includes(flashcard.Category);
    const phaseMatch = filterPhases.includes('All') || Object.keys(flashcard.phases).some(phase => filterPhases.includes(phase));
    const searchTermMatch = searchTerm === '' || Object.values(flashcard).join('').toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && phaseMatch && searchTermMatch;
  });

  const handleCategoryFilter = (category) => {
    const updatedCategories = [...filterCategories];
    const updatedActiveCategoryButtons = [...activeCategoryButtons];
    
    if (category === 'All') {
      updatedCategories.splice(0, updatedCategories.length, 'All');
      updatedActiveCategoryButtons.splice(0, updatedActiveCategoryButtons.length, 'All');
    } else {
      const categoryIndex = updatedCategories.indexOf(category);
      if (categoryIndex === -1) {
        updatedCategories.push(category);
        updatedActiveCategoryButtons.push(category);
      } else {
        updatedCategories.splice(categoryIndex, 1);
        updatedActiveCategoryButtons.splice(updatedActiveCategoryButtons.indexOf(category), 1);
      }

      // Verifica se tutte le categorie sono state deselezionate o se solo 'All' è rimasto selezionato
      if (updatedCategories.length === 0 || (updatedCategories.length === 1 && updatedCategories.includes('All'))) {
        updatedCategories.push('All');
        updatedActiveCategoryButtons.push('All');
      } else if (updatedCategories.includes('All')) {
        updatedCategories.splice(updatedCategories.indexOf('All'), 1);
        updatedActiveCategoryButtons.splice(updatedActiveCategoryButtons.indexOf('All'), 1);
      }
    }
    

    // Aggiorna lo stato dei filtri e dei bottoni delle categorie
    setFilterCategories(updatedCategories);
    setActiveCategoryButtons(updatedActiveCategoryButtons);
    AOS.refresh();

    // Aggiorna il colore di tutti i bottoni delle categorie in base alla loro attività
    Object.keys(categoryColors).forEach(categoryKey => {
      const button = document.querySelector(`.${categoryKey}`);
      if (button) {
        const isActive = updatedActiveCategoryButtons.includes(categoryKey);
        button.style.backgroundColor = isActive ? hoverColorsCategory[categoryKey] : categoryColors[categoryKey];
      }
    });
  };
  
  // Gestione hover dei bottoni delle categorie
const handleCategoryButtonHover = (category, isHovering) => {
  const button = document.querySelector(`.${category}`);
  if (button && !activeCategoryButtons.includes(category)) {
    button.style.backgroundColor = isHovering ? hoverColorsCategory[category] : categoryColors[category];
  }
};

// Gestione hover dei bottoni delle fasi del SDLC
const handlePhaseButtonHover = (phase, isHovering) => {
  const button = document.querySelector(`.${phase}`);
  if (button && !activePhaseButtons.includes(phase)) {
    button.style.backgroundColor = isHovering ? hoverColorsPhase[phase] : phaseColors[phase];
  }
};


  const handlePhaseFilter = (phase) => {
    const updatedPhases = [...filterPhases];
    const updatedActivePhaseButtons = [...activePhaseButtons];
  
    if (phase === 'All') {
      updatedPhases.splice(0, updatedPhases.length, 'All');
      updatedActivePhaseButtons.splice(0, updatedActivePhaseButtons.length, 'All');
    } else {
      const phaseIndex = updatedPhases.indexOf(phase);
      if (phaseIndex === -1) {
        updatedPhases.push(phase);
        updatedActivePhaseButtons.push(phase);
      } else {
        updatedPhases.splice(phaseIndex, 1);
        updatedActivePhaseButtons.splice(updatedActivePhaseButtons.indexOf(phase), 1);
      }

      // Verifica se tutte le fasi sono state deselezionate o se solo 'All' è rimasto selezionato
      if (updatedPhases.length === 0 || (updatedPhases.length === 1 && updatedPhases.includes('All'))) {
        updatedPhases.push('All');
        updatedActivePhaseButtons.push('All');
      } else if (updatedPhases.includes('All')) {
        updatedPhases.splice(updatedPhases.indexOf('All'), 1);
        updatedActivePhaseButtons.splice(updatedActivePhaseButtons.indexOf('All'), 1);
      }
    }

    // Aggiorna lo stato dei filtri e dei bottoni delle fasi del SDLC
    setFilterPhases(updatedPhases);
    setActivePhaseButtons(updatedActivePhaseButtons);
    AOS.refresh();

    // Aggiorna il colore di tutti i bottoni delle fasi del SDLC in base alla loro attività
    phaseButtons.forEach(phaseKey => {
      const button = document.querySelector(`.${phaseKey}`);
      if (button) {
        const isActive = updatedActivePhaseButtons.includes(phaseKey);
        button.style.backgroundColor = isActive ? hoverColorsPhase[phaseKey] : phaseColors[phaseKey];
      }
    });
  };

  return (
    <FadeIn>
      <div className="container">
        <div className="buttons-container">
        {Object.keys(categoryColors).map(category => (
          <button 
          key={category} 
          onClick={() => handleCategoryFilter(category)} 
          onMouseEnter={() => handleCategoryButtonHover(category, true)} // Aggiunto evento onMouseEnter
          onMouseLeave={() => handleCategoryButtonHover(category, false)} // Aggiunto evento onMouseLeave
          className={`category-button ${activeCategoryButtons.includes(category) ? 'button-active' : ''} ${category}`}
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
    onClick={() => handlePhaseFilter(phase)} 
    onMouseEnter={() => handlePhaseButtonHover(phase, true)} // Aggiunto evento onMouseEnter
    onMouseLeave={() => handlePhaseButtonHover(phase, false)} // Aggiunto evento onMouseLeave
    className={`phase-button ${activePhaseButtons.includes(phase) ? 'button-active' : ''}  ${phase}`}
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

    <div style={{ fontSize: '14px', margin: '5px 0', fontFamily: 'Lucida Fax' }}>
      {expandedFlashcard === flashcard.id ? (flashcard.Category === 'Explainability' ? formatText(flashcard['Explanation Goal']) : formatText(flashcard.fullDescription)) : (flashcard.Category === 'Explainability' ? formatText(truncateExplanationGoal(flashcard.previewExplanationGoal)) : formatText(truncateDescription(flashcard.previewDescription)))}
    </div>

    {flashcard.Threat && (
      <p className="threat-info">
        <strong>Threat:</strong> {flashcard.Threat}
      </p>
    )}

    {flashcard['Sub-Threat'] && (
      <p className="sub-threat-info">
        <strong>Sub-Threat:</strong> {flashcard['Sub-Threat']}
      </p>
    )}

    {flashcard['Data type'] && (
      <p className="data-type-info">
        <strong>Data type:</strong> {flashcard['Data type']}
      </p>
    )}

    {flashcard['Local/Global Explanation'] && (
      <p className="explanation-type-info">
        <strong>Local/Global Explanation:</strong> {flashcard['Local/Global Explanation']}
      </p>
    )}

    {expandedFlashcard === flashcard.id && (
      <div onClick={(e) => e.stopPropagation()}>
      <i>Actions to undertake for each SDLC phase</i>
      {Object.entries(flashcard.phases).map(([phase, action], idx) => (
        <p key={idx} className="phase-info">
          <strong>{handlePhaseName(phase)}:</strong> {action}
        </p>
      ))}

       

      {flashcard['Vulnerability (consequence)'] && (
        <p className="vulnerability-info">
          <strong>Vulnerability (Consequence):</strong> {flashcard['Vulnerability (consequence)']}
        </p>
      )}

      </div>
    )}
  </div>
))}
        </div>
      </div>
    </FadeIn>
  );
};

export default Catalogue;
