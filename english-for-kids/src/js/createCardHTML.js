export function createCardHTML(image, word, translation) {
  const content = `
  <div class="card-blackout"></div> 
  <div class="card-box-front">  
    <img src="../assets/images/${image}" alt="${word}" height="150px" 
    class="card-image">
    <div class="card-front-description">
      <div class="card-title">${word}</div>
      <button class="card-btn"></button>
    </div>
  </div>
  <div class="card-box-back">  
    <img src="../assets/images/${image}" alt="${word}" height="150px" 
    class="card-image">
    <div class="card-back-description">
      <div class="card-title">${translation}</div>  
    </div>
  </div>  `;
  return content;
}
