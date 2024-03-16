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
        setExpandedFlashcard(initialPhases);
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

  const categoryColors = {'All': '#ffffff', 'Security': '#86e2ff', 'Privacy': '#9aff9a', 'Fairness': '#e290fd','Explainability': '#ffd771'};
  const phaseColors = {'All' : '#ffffff','Design' : '#ffd1d7','Development' : '#ffd1d7','Deployment' : '#ffd1d7','Testing' : '#ffd1d7','Monitoring': '#ffd1d7', 'RE': '#ffd1d7'};
  const hoverColorsPhase = {'Design' : '#fc5c5c','Development' : '#fc5c5c','Deployment' : '#fc5c5c','Testing' : '#fc5c5c','Monitoring': '#fc5c5c','RE': '#fc5c5c' };
  const hoverColors = {'Security': '#86a4ff', 'Privacy': '#00f496','Fairness': '#c23bec','Explainability': '#ff8f71'};
  const phaseButtons = ['All', 'Deployment', 'Design', 'Testing', 'RE', 'Monitoring', 'Development'];

  const filteredFlashcards = flashcards.filter(flashcard => {
    const categoryMatch = filterCategories.includes('All') || filterCategories.includes(flashcard.Category);
    const phaseMatch = filterPhases.includes('All') || Object.keys(flashcard.phases).some(phase => filterPhases.includes(phase));
    const searchTermMatch = searchTerm === '' || Object.values(flashcard).join('').toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && phaseMatch && searchTermMatch;
  });

  const handleMouseEnter2 = (phase) => {
    const button = document.querySelector(`.${phase}`);
    if (button && !activePhaseButtons.includes(phase)) {
      button.style.backgroundColor = hoverColorsPhase[phase];
    }
  };

  const handleMouseLeave2 = (phase) => {
    const button = document.querySelector(`.${phase}`);
    if (button && !activePhaseButtons.includes(phase)) {
      button.style.backgroundColor = phaseColors[phase];
    }
  };

  const handleMouseEnter = (category) => {
    const button = document.querySelector(`.${category}`);
    if (button && !activeCategoryButtons.includes(category)) {
      button.style.backgroundColor = hoverColors[category];
    }
  };

  const handleMouseLeave = (category) => {
    const button = document.querySelector(`.${category}`);
    if (button && !activeCategoryButtons.includes(category)) {
      button.style.backgroundColor = categoryColors[category];
    }
  };

  const handleCategoryFilter = (category) => {
    const updatedCategories = [...filterCategories];
    const updatedActiveCategoryButtons = [...activeCategoryButtons];
    const categoryIndex = updatedCategories.indexOf(category);
    
    if (categoryIndex === -1) {
      updatedCategories.push(category);
      updatedActiveCategoryButtons.push(category);
    } else {
      updatedCategories.splice(categoryIndex, 1);
      updatedActiveCategoryButtons.splice(updatedActiveCategoryButtons.indexOf(category), 1);
    }
  
    if (updatedCategories.length === 0 || (updatedCategories.length === 1 && updatedCategories.includes('All'))) {
      updatedCategories.push('All');
      updatedActiveCategoryButtons.push('All');
    } else if (updatedCategories.includes('All')) {
      updatedCategories.splice(updatedCategories.indexOf('All'), 1);
      updatedActiveCategoryButtons.splice(updatedActiveCategoryButtons.indexOf('All'), 1);
    }
  
    setFilterCategories(updatedCategories);
    setActiveCategoryButtons(updatedActiveCategoryButtons);
    AOS.refresh();
  };

  const handlePhaseFilter2 = (phase) => {
  const updatedPhases = [...filterPhases];
  const updatedActivePhaseButtons = [...activePhaseButtons];
  const phaseIndex = updatedPhases.indexOf(phase);

  if (phaseIndex === -1) {
    updatedPhases.push(phase);
    updatedActivePhaseButtons.push(phase);
  } else {
    updatedPhases.splice(phaseIndex, 1);
    updatedActivePhaseButtons.splice(updatedActivePhaseButtons.indexOf(phase), 1);
  }

  if (updatedPhases.length === 0 || (updatedPhases.length === 1 && updatedPhases.includes('All'))) {
    updatedPhases.push('All');
    updatedActivePhaseButtons.push('All');
  } else if (updatedPhases.includes('All')) {
    updatedPhases.splice(updatedPhases.indexOf('All'), 1);
    updatedActivePhaseButtons.splice(updatedActivePhaseButtons.indexOf('All'), 1);
  }

  setFilterPhases(updatedPhases);
  setActivePhaseButtons(updatedActivePhaseButtons);
  AOS.refresh();
};

  return (
    <FadeIn>
      <div className="container">
        <div className="buttons-container">
          {Object.keys(categoryColors).map(category => (
            <button 
              key={category} 
              onClick={() => handleCategoryFilter(category)} 
              onMouseEnter={() => handleMouseEnter(category)} 
              onMouseLeave={() => handleMouseLeave(category)} 
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
              onClick={() => handlePhaseFilter2(phase)} 
              onMouseEnter={() => handleMouseEnter2(phase)} 
              onMouseLeave={() => handleMouseLeave2(phase)} 
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
    </FadeIn>
  );
};

export default Catalogue;
