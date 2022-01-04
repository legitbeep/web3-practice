import { useEffect, useState} from 'react';

const API_KEY = "";


const useGif = (keyword : string) => {
    const [gifUrl, setGifUrl] = useState("");

    const fetchGifs = async() => {
        try{
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.trim().split(" ").join("")}&limit=1`);
            const { data } = await response.json();

            setGifUrl(data[0]?.images?.downsized_medium?.url);
        } catch(err) {
            setGifUrl("https://media.giphy.com/media/jU9OCvBiO1besabUKU/giphy.gif");
        }
    }

    useEffect(() => {
        if(keyword.trim())
        fetchGifs();
    },[keyword])

    return gifUrl;
}

export default useGif;