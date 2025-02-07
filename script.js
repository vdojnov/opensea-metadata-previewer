function previewMetadata() {
    try {
        const jsonInput = document.getElementById('jsonInput').value;
        const metadata = JSON.parse(jsonInput);
        
        // Update image
        const imageContainer = document.getElementById('nftImage');
        imageContainer.style.backgroundImage = `url(${metadata.image})`;
        
        // Update name and description
        document.getElementById('nftName').textContent = metadata.name || 'Unnamed NFT';
        document.getElementById('nftDescription').textContent = metadata.description || '';
        
        // Clear previous content
        const detailsContainer = document.getElementById('nftDetails');
        const nameEl = document.getElementById('nftName');
        const descEl = document.getElementById('nftDescription');
        detailsContainer.innerHTML = '';
        detailsContainer.appendChild(nameEl);
        detailsContainer.appendChild(descEl);
        
        // Create sections
        const properties = [];
        const rankings = [];
        const stats = [];
        const boosts = [];
        const dates = [];  // New array for dates
        
        // Sort attributes into categories
        if (metadata.attributes && Array.isArray(metadata.attributes)) {
            metadata.attributes.forEach(attr => {
                switch(attr.display_type) {
                    case 'boost_number':
                    case 'boost_percentage':
                        boosts.push(attr);
                        break;
                    case 'number':
                        stats.push(attr);
                        break;
                    case 'progress':
                        rankings.push(attr);
                        break;
                    case 'date':
                        dates.push(attr);  // Add dates to their own array
                        break;
                    default:
                        properties.push(attr);
                }
            });
        }

        // Render Properties
        if (properties.length > 0) {
            const propertiesSection = document.createElement('div');
            propertiesSection.innerHTML = `
                <div class="section-title">
                    <span>⚡</span> Properties
                </div>
                <div class="properties-grid">
                    ${properties.map(prop => `
                        <div class="property-box">
                            <div class="property-type">${prop.trait_type}</div>
                            <div class="property-value">${prop.value}</div>
                            <div class="property-rarity">${prop.rarity || '20% have this'}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            detailsContainer.appendChild(propertiesSection);
        }

        // Render Rankings
        if (rankings.length > 0) {
            const rankingsSection = document.createElement('div');
            rankingsSection.className = 'rankings';
            rankingsSection.innerHTML = `
                <div class="section-title">
                    <span>📊</span> Rankings
                </div>
                ${rankings.map(rank => `
                    <div class="ranking-item">
                        <div class="ranking-label">
                            <span class="ranking-name">${rank.trait_type}</span>
                            <span class="ranking-value">${rank.value} of ${rank.max_value}</span>
                        </div>
                        <div class="ranking-bar">
                            <div class="ranking-progress" style="width: ${(rank.value / rank.max_value) * 100}%"></div>
                        </div>
                    </div>
                `).join('')}
            `;
            detailsContainer.appendChild(rankingsSection);
        }

        // Render Stats
        if (stats.length > 0) {
            const statsSection = document.createElement('div');
            statsSection.className = 'stats';
            statsSection.innerHTML = `
                <div class="section-title">
                    <span>📈</span> Stats
                </div>
                ${stats.map(stat => `
                    <div class="stat-item">
                        <span class="stat-name">${stat.trait_type}</span>
                        <span class="stat-value">${stat.value}</span>
                    </div>
                `).join('')}
            `;
            detailsContainer.appendChild(statsSection);
        }

        // Render Boosts
        if (boosts.length > 0) {
            const boostsSection = document.createElement('div');
            boostsSection.className = 'boosts';
            boostsSection.innerHTML = `
                <div class="section-title">
                    <span>⚡</span> Boosts
                </div>
                ${boosts.map(boost => `
                    <div class="boost-item">
                        <div class="boost-icon">⚡</div>
                        <div class="boost-details">
                            <div class="boost-name">${boost.trait_type}</div>
                            <div class="boost-value">${boost.value}${boost.display_type === 'boost_percentage' ? '%' : '+'} boost</div>
                        </div>
                    </div>
                `).join('')}
            `;
            detailsContainer.appendChild(boostsSection);
        }

        // Render Dates
        if (dates.length > 0) {
            const datesSection = document.createElement('div');
            datesSection.className = 'dates';
            datesSection.innerHTML = `
                <div class="section-title">
                    <span>📅</span> Dates
                </div>
                ${dates.map(date => {
                    const dateObj = new Date(date.value * 1000);
                    const formattedDate = dateObj.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    return `
                        <div class="date-item">
                            <div class="date-icon">📅</div>
                            <div class="date-details">
                                <div class="date-name">${date.trait_type}</div>
                                <div class="date-value">${formattedDate}</div>
                            </div>
                        </div>
                    `;
                }).join('')}
            `;
            detailsContainer.appendChild(datesSection);
        }
        
    } catch (error) {
        alert('Invalid JSON format: ' + error.message);
    }
}

// Add sample data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const sampleMetadata = {
        "name": "Enhanced NFT Example",
        "description": "This NFT demonstrates all OpenSea display types.",
        "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
        "attributes": [
            {
                "trait_type": "Base",
                "value": "Starfish"
            },
            {
                "display_type": "boost_number",
                "trait_type": "Power Level",
                "value": 40
            },
            {
                "display_type": "boost_percentage",
                "trait_type": "Stamina Increase",
                "value": 10
            },
            {
                "display_type": "number",
                "trait_type": "Generation",
                "value": 2
            },
            {
                "display_type": "date",
                "trait_type": "Created Date",
                "value": 1546360800
            },
            {
                "display_type": "date",
                "trait_type": "Expiration Date",
                "value": 1893456000
            },
            {
                "trait_type": "Rarity",
                "value": "Legendary"
            },
            {
                "display_type": "boost_number",
                "trait_type": "Defense Bonus",
                "value": 15
            },
            {
                "display_type": "boost_percentage",
                "trait_type": "Critical Hit Chance",
                "value": 25
            }
        ]
    };
    
    document.getElementById('jsonInput').value = JSON.stringify(sampleMetadata, null, 2);
    previewMetadata();
});

// Add this function to fetch metadata from URL
async function fetchMetadata() {
    const urlInput = document.getElementById('urlInput');
    const url = urlInput.value.trim();
    
    if (!url) {
        alert('Please enter a valid URL');
        return;
    }
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const metadata = await response.json();
        
        // Update the JSON input with the fetched data
        document.getElementById('jsonInput').value = JSON.stringify(metadata, null, 2);
        
        // Preview the metadata
        previewMetadata();
    } catch (error) {
        alert('Error fetching metadata: ' + error.message);
    }
} 