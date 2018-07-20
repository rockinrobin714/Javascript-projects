var colors = ['green', 'red', 'purple'],
    textures = ['solid', 'white', 'striped'],
    numbers = [1, 2, 3],
    shapes = ['diamond', 'squiggle', 'pill'];

var deck = [];
colors.forEach(color => {
  textures.forEach(texture => {
    numbers.forEach(number => {
      shapes.forEach(shape => {
        deck.push({ color, texture, number, shape });
      })
    })
  })
})

console.log(deck)