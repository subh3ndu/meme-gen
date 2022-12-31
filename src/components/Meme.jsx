import React from 'react';

const Meme = () => {
    const [meme, setMeme] = React.useState({
        topText: 'welcome to',
        bottomText: 'meme generator',
        randomImage: 'https://i.imgflip.com/1ur9b0.jpg',
    });

    const [allMemes, setAllMemes] = React.useState({});

    React.useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then((res) => res.json())
            .then((data) => setAllMemes(data));
    }, []);

    function getMemeImage() {
        const { data } = allMemes;
        const memes = data.memes;
        const randomNumber = Math.floor(Math.random() * memes.length);
        const url = memes[randomNumber].url;

        setMeme((prevState) => ({
            ...prevState,
            randomImage: url,
        }));
    }

    function handleChange({ target }) {
        const { name, value } = target;
        setMeme((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button onClick={getMemeImage} className="form--button">
                    Generate a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--img" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    );
};

export default Meme;
