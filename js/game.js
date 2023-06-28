// Dummy
let canvas = document.createElement("canvas");

let context = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
let meets = 0;
// Action for hero



// rendering images

function loadImage(src) {
  const image = new Image();
  image.src = src;
  return new Promise((resolve, reject) => {
    image.onload = () => resolve(image);
    image.onerror = reject;

  });
};
async function renderImage(image_src, x, y) {
  try {
    const loadedImage = await loadImage(image_src);
    context.drawImage(loadedImage, x, y)
  }
  catch (error) {
    console.error(error);

  }

};
let monster = { x: 0, y: 0, prevX: -1, prevY: -1 };
async function resetMonster(image_src) {

  try {


    const loadedImage = await loadImage(image_src);
    if (monster.prevX != monster.x && monster.prevY != monster.y) {
      monster.x = 32 + Math.random() * (canvas.width - 84);

      monster.y = 32 + Math.random() * (canvas.height - 84);
    }
    context.drawImage(loadedImage, monster.x, monster.y);

    monster.prevX = monster.x;
    monster.prevY = monster.y;



  }
  catch (error) {
    console.error(error);
  }


}

const hero = {
  x: canvas.width / 2,
  y: canvas.height / 2

}
//Background Image
let bgImage = new Image();

bgImage.src = 'images/background.png';
// Hero Image
let heroImage = new Image();
heroImage.src = 'images/hero.png';
//Monster Image
let monsterImage = new Image();
monsterImage.src = 'images/monster.png';
function render() {

  renderImage(bgImage.src, 0, 0);
  renderImage(heroImage.src, hero.x, hero.y);

  resetMonster(monsterImage.src);
}




keysDown = {};
// rendering images



addEventListener("keydown", () => {
  keysDown[event.keyCode] = true;

  updateHero();
});
addEventListener("keyup", () => {
  delete keysDown[event.keyCode];

});



function updateHero() {
  //right
  if (39 in keysDown) {
    if (hero.x <= 455)
      hero.x += 5;


  }

  //left
  if (37 in keysDown) {

    if (hero.x >= 20)
      hero.x -= 5;


  }
  //down
  if (40 in keysDown) {
    if (hero.y <= 430)
      hero.y += 5;

  }
  //up
  if (38 in keysDown) {
    if (hero.y >= 20)
      hero.y -= 5;

  }

  //are they meet..?

  if (monster.x - 20 <= hero.x &&
    hero.x <= monster.x + 20 &&
    monster.y - 20 <= hero.y &&
    hero.y <= monster.y + 20) {

    let score = document.getElementById("score");

    meets++;
    score.innerHTML = `<h2>${meets}</h2>`;

    // console.log(++meets);
    monster.prevX = -1;
    monster.prevY = -1;

    // resetMonster(monsterImage.src);


  }


}



function main() {

  updateHero();
  render();
  requestAnimationFrame(main);
}
// render();

main();


document.body.appendChild(canvas);

