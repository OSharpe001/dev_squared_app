import { useState } from "react";
import { images } from "./images";


export default function Hero() {

    const [currentMeme, setCurrentMeme] = useState(images[Math.floor(Math.random() * images.length)]);

    const setNewMeme = () => {
        setCurrentMeme(images[Math.floor(Math.random() * images.length)]);
    };

    return (
        <section className="hero">
            <h2 className="speech">
                Here at Dev Squared, we are dedicated to the
                development of our fellow Developers!
                Since you're here, we are certain that
                you are, too! While you're here, please
                enjoy our blogs where your fellow Software
                Developers have left their lessons,
                ponderances, insights, inspirations and other
                gems...
                <br />
                Join us and leave a blog for the progeny!
            </h2>
            <button className="meme-button" onClick={setNewMeme}><img src={currentMeme.image} alt={currentMeme.alt} className={currentMeme.class} /></button>
        </section>
    );
};