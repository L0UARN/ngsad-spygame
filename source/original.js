let progress = 0

// Adds a "filter" to the base
function add_filter() {
    let new_filter = document.createElement("img")
    new_filter.src = `media/filter_${progress}.png`
    document.getElementById("stack").appendChild(new_filter)

    if (progress == 3) {
        final_hint()
    }
}

// Adds the final step of the puzzle to the page
async function final_hint() {
    let hint = document.createElement("div")
    hint.className = "final_hint"

    let image = document.createElement("img")
    image.src = "media/hint_4.png"

    let input = document.createElement("input")
    input.type = "text"
    input.id = "answer_4"

    hint.appendChild(image)
    hint.appendChild(input)
    document.getElementById("root").appendChild(hint)

    let answer_4 = document.getElementById("answer_4")
    answer_4.addEventListener("keyup", (event) => {
        if (answer_4.value.toLocaleLowerCase() == "cataclisme") {
            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
    })
}

// Adds a flashing image to the page
async function flashes() {
    if (progress != 0) {
        let flash = document.createElement("img")
        flash.src = `media/flash_${1 + Math.floor(Math.random() * progress)}.png`
        flash.style = `z-index: 666;`
                    + `position: fixed;`
                    + `top: ${Math.floor(Math.random() * 101)}%;`
                    + `left: ${Math.floor(Math.random() * 101)}%;`
                    + `transform: rotate(${Math.random()}turn);`
                    + `width: ${Math.floor(Math.random() * 224) + 32}px;`
        document.getElementById("root").appendChild(flash)

        setTimeout(() => {
            flash.remove()
        }, 25 * progress)

        setTimeout(() => {
            flashes()
        }, Math.random() * (12750 - progress * 4000))
    }
    else {
        setTimeout(() => {
            flashes()
        }, 30000)
    }
}

// Swaps out the original title with a creepy one
async function title_swap() {
    if (progress != 0) {
        let original_title = document.getElementById("title").innerHTML
        document.getElementById("title").innerHTML = ["Be Prepared for Hell", "Heil Satan", "D̶̛̘̥̪̱̜͍͇͔̲͕͇̪̥̮̗̮̩̻̘͉̟̦͓̺̼̹̲̬̙̀͛̇͋͐̈́̓̃͐̊̇̊̓̆̇̀͋̓̍̓͂̍̚̚͘͜E̴̡̢̨̢̜͔̭̮̹̱̳̣͖̻͉̥͙͕͙̹̘̭̯̪̙͒̃͌̀͋͗́͑̂̕ͅĄ̷̢̡̨̨̡̛̛̩̗̗̫̺̼̦̼͍͚̩̩̼̖̱̥̲̰̗̻̘̌̓̂̄̂̇͆̈͌̽̈́́̓͌̒̚̚Ṯ̴̡̻̖̳̙̹̭̰̯͚̝͙̯̓̌̒̐͑̔̌̐̓́̈́́̎̆̀͝Ḩ̸̡̭̠͇͇̥̫̠̥̦͍̰͓̳̻͖̯͚̣͖̬̤̦̯͚͗̇̅̓́̀̍̃͘̕͜͜"][Math.floor(Math.random() * progress)]

        setTimeout(() => {
            document.getElementById("title").innerHTML = original_title
        }, 300)

        setTimeout(() => {
            title_swap()
        }, Math.random() * (30000 - progress * 8000) + 301)
    }
    else {
        setTimeout(() => {
            title_swap()
        }, 15000)
    }
}

// Plays a ominous background sound
async function background_noise() {
    let sound_switch = false

    let whitenoise_1 = new Howl({
        src: ["media/whitenoise.mp3"],
        autoplay: false,
        html5: true,
        volume: 0.0
    })

    let whitenoise_2 = new Howl({
        src: ["media/whitenoise.mp3"],
        autoplay: false,
        html5: true,
        volume: 0.0
    })

    let sound_1 = whitenoise_2.play()
    let sound_2 = whitenoise_2.play()

    setInterval(() => {
        let volume = 0.0

        switch (progress) {
            case 0:
                volume = 0.0
                break
            case 1:
                volume = 0.05
                break
            case 2:
                volume = 0.2
                break
            case 3:
                volume = 0.5
                break
        }

        whitenoise_1.volume(volume)
        whitenoise_2.volume(volume)

        if (sound_switch) {
            whitenoise_1.fade(volume, 0, 100, sound_1)

            sound_switch = true
            whitenoise_2.play()
            whitenoise_2.fade(0, volume, 100, sound_2)
        }
        else {
            whitenoise_2.fade(volume, 0, 100, sound_2)

            sound_switch = false
            whitenoise_1.play()
            whitenoise_1.fade(0, volume, 100, sound_1)
        }
    }, 4900)
}

// Called when the page is fully loaded
window.onload = () => {
    let answer_1 = document.getElementById("answer_1")
    answer_1.addEventListener("keyup", (event) => {
        if (answer_1.value.toLocaleLowerCase() == "damnation") {
            document.getElementById("hint_1").innerHTML = "damnation"
            answer_1.remove()

            progress++
            add_filter()
        }
    })

    let answer_2 = document.getElementById("answer_2")
    answer_2.addEventListener("keyup", (event) => {
        if (answer_2.value.toLocaleLowerCase() == "apocalypse") {
            document.getElementById("hint_2").innerHTML = "apocalypse"
            answer_2.remove()

            progress++
            add_filter()
        }
    })

    let answer_3 = document.getElementById("answer_3")
    answer_3.addEventListener("keyup", (event) => {
        if (answer_3.value.toLocaleLowerCase() == "vvrbbvvbbbbvrbbbvbbvrbvbbvvvvrbrvv") {
            document.getElementById("hint_3").innerHTML = "vvrbbvvbbbbvrbbbvbbvrbvbbvvvvrbrvv"
            answer_3.remove()

            progress++
            add_filter()
        }
    })

    flashes()
    title_swap()
    background_noise()
}
