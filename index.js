const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6
})

const player = new Fighter({
    position: {
        x: 0, y: 0
    }, velocity: {
        x: 0, y: 0
    }, offset: {
        x: 0, y: 0
    },
    //imageSrc: './img/samuraiMack/Idle.png',
    imageSrc: './img/evilWizard/Idle.png',
    //imageSrc: './img/fantasyWarrior/Idle.png',
    framesMax: 8,
    //framesMax: 10, //fantasy
    //scale: 2.5, //mack
    scale: 2.3, //evil
    //scale: 2.8, //fantasy
    offset: { //posicao personagem
        //x: 215, //mack
        x: 217, //evil
        //x: 110, //fantasy
        //y: 157 //mack
        y: 230 //evil
        //y: 130 //fantasy
    },
    sprites: {
        idle: {
            //imageSrc: './img/samuraiMack/Idle.png',
            imageSrc: './img/evilWizard/Idle.png',
            //imageSrc: './img/fantasyWarrior/Idle.png',
            //framesMax: 8 //mack
            framesMax: 8 //evil
            //framesMax: 10 //fantasy
        },
        run: {
            //imageSrc: './img/samuraiMack/Run.png',
            imageSrc: './img/evilWizard/Run.png',
            //imageSrc: './img/fantasyWarrior/Run.png',
            //framesMax: 8 //mack
            framesMax: 8 //evil
            //framesMax: 8 //fantasy
        },
        jump: {
            //imageSrc: './img/samuraiMack/Jump.png',
            imageSrc: './img/evilWizard/Jump.png',
            //imageSrc: './img/fantasyWarrior/Jump.png',
            //framesMax: 2 //mack
            framesMax: 2 //evil
            //framesMax: 3 //fantasy
        },
        fall: {
            //imageSrc: './img/samuraiMack/Fall.png',
            imageSrc: './img/evilWizard/Fall.png',
            //imageSrc: './img/fantasyWarrior/Fall.png',
            //framesMax: 2 //mack
            framesMax: 2 //evil
            //framesMax: 3 //fantasy
        },
        attack1: {
            //imageSrc: './img/samuraiMack/Attack1.png',
            imageSrc: './img/evilWizard/Attack1.png',
            //imageSrc: './img/fantasyWarrior/Attack1.png',
            //framesMax: 6 //mack
            framesMax: 8 //evil
            //framesMax: 7 //fantasy
        },
        attack2: {
            //imageSrc: './img/samuraiMack/Attack2.png',
            imageSrc: './img/evilWizard/Attack2.png',
            //imageSrc: './img/fantasyWarrior/Attack2.png',
            //framesMax: 6 //mack
            framesMax: 8 //evil
            //framesMax: 7 //fantasy
        },
        takeHit: {
            //imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
            imageSrc: './img/evilWizard/Take hit.png',
            //imageSrc: './img/fantasyWarrior/Take hit.png',
            //framesMax: 4 //mack
            framesMax: 3 //evil
            //framesMax: 3 //fantasy
        },
        death: {
            //imageSrc: './img/samuraiMack/Death.png',
            imageSrc: './img/evilWizard/Death.png',
            //imageSrc: './img/fantasyWarrior/Death.png',
            //framesMax: 6 //mack
            framesMax: 7 //evil
            //framesMax: 7 //fantasy
        }
    },
    attackBox: { //tamanho e posicao hitbox
        offset: {
            x: 100,
            y: 50
        },
        width: 160,
        height: 50
    }
})

const enemy = new Fighter({
    position: {
        x: 400, y: 100
    }, velocity: {
        x: 0, y: 0
    }, color: 'blue',
       offset: {
        x: -50, y: 0
    },
    //imageSrc: '/img/medivalKnight/Idle.png',
    imageSrc: './img/kenji/Idle.png',
        //framesMax: 8,
        framesMax: 4,
        scale: 2.5,
        offset: {
            x: 215,
            y: 167
        },
        sprites: {
            idle: {
                //imageSrc: '/img/medivalKnight/Idle.png',
                imageSrc: './img/kenji/Idle.png',
                //framesMax: 8
                framesMax: 4
            },
            run: {
                //imageSrc: './img/medivalKnight/Run.png',
                imageSrc: './img/kenji/Run.png',
                //framesMax: 8
                framesMax: 8
            },
            jump: {
                //imageSrc: './img/medivalKnight/Jump.png',
                imageSrc: './img/kenji/Jump.png',
                //framesMax: 2
                framesMax: 2
            },
            fall: {
                //imageSrc: './img/medivalKnight/Fall.png',
                imageSrc: './img/kenji/Fall.png',
                //framesMax: 2
                framesMax: 2
            },
            attack1: {
                //imageSrc: './img/medivalKnight/Attack1.png',
                imageSrc: './img/kenji/Attack1.png',
                //framesMax: 4
                framesMax: 4
            },
            attack2: {
                //imageSrc: './img/medivalKnight/Attack2.png',
                imageSrc: './img/kenji/Attack2.png',
                //framesMax: 4
                framesMax: 4
            },
            takeHit: {
                //imageSrc: './img/medivalKnight/Take Hit.png',
                imageSrc: './img/kenji/Take hit.png',
                //framesMax: 4
                framesMax: 3
            },
            death: {
                //imageSrc: './img/medivalKnight/Death.png',
                imageSrc: './img/kenji/Death.png',
                //framesMax: 6
                framesMax: 7
            }
        },
         attackBox: {
             offset: {
                 x: -170,
                 y: 50
             },
             width: 170,
             height: 50
         }
})

const keys = {
    a: {
        pressed: false
    }, d: {
        pressed: false
    }, ArrowRight: {
        pressed: false
    }, ArrowLeft: {
        pressed: false
    }
}

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    c.fillStyle = 'rgba(255, 255, 255, 0.15)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()



    player.velocity.x = 0
    enemy.velocity.x = 0

//player movement

    if (keys.a.pressed && player.lastKey === 'a') {
       player.velocity.x = -5
       player.switchSprite('run')
    } else if (keys.d.pressed && player.lastKey === 'd') {
       player.velocity.x = 5
       player.switchSprite('run')
    } else {
       player.switchSprite('idle')
    }
//jumping
    if (player.velocity.y < 0) {
       player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
       player.switchSprite('fall')

    }

//enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    } else {
        enemy.switchSprite('idle')
     }
//jumping
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }

//detect for collision & enemy gets hit
    if ( rectangularCollision({
        rectangle1: player,
        rectangle2: enemy
    }) &&
        player.isAttacking && player.framesCurrent === 5) { //4 samuraiMack
        enemy.takeHit()
        player.isAttacking = false
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
    }

    //if player misses
    if (player.isAttacking && player.framesCurrent === 5) {
        player.isAttacking = false
    }

    // this is where our player gets hit

    if ( rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) &&
        enemy.isAttacking && enemy.framesCurrent === 2
    ) {
        player.takeHit()
        enemy.isAttacking = false
        gsap.to('#playerHealth', {
            width: player.health + '%'
        })
    }

    //if enemy misses
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false
    }

    //end game based on health
    if (enemy.health <= 0 || player.health <= 0){
        determineWinner({player, enemy, timerId})
    }
}

animate();

window.addEventListener('keydown', (event) => {
    if (!player.dead) {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true
                player.lastKey = 'd'
                break
            case 'a':
                keys.a.pressed = true
                player.lastKey = 'a'
                break
            case 'w':
                player.velocity.y = -20
                break
            case 'g':
                player.attack(1)
                break
            case 'h':
                player.attack(2)
                break
        }
    }
    if (!enemy.dead) {
        switch (event.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                enemy.lastKey = 'ArrowRight'
                break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
                break
            case 'ArrowUp':
                enemy.velocity.y = -20
                break
            case '1':
                enemy.attack(1)
                break
            case '2':
                enemy.attack(2)
                break
        }
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break
        case 'a':
            keys.a.pressed = false
            break
    }
    //enemy keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})
