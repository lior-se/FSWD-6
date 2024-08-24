import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGameById, updateGame } from '../server';
import '../styles/GamePage.css';
import '../styles/ShopGamePage.css';

const ShopGamePage = () => {
    const { id } = useParams();
    const [gameData, setGameData] = useState(null);
    const [displayedImage, setDisplayedImage] = useState('');
    const [isEditing, setIsEditing] = useState({});
    const [editValues, setEditValues] = useState({});
    const [newThumbnailUrl, setNewThumbnailUrl] = useState(''); // State for new thumbnail URL
    const [addingThumbnail, setAddingThumbnail] = useState(false); // State for showing/hiding the input for new thumbnail

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const game = await getGameById(id);
                setGameData(game);
                setDisplayedImage(game.cover);
            } catch (error) {
                console.error('Error fetching game data:', error);
            }
        };

        fetchGame();
    }, [id]);

    if (!gameData) {
        return <div>Loading...</div>;
    }

    const handleThumbnailClick = (mediaUrl) => {
        setDisplayedImage(mediaUrl);
    };

    const handleDoubleClick = (field) => {
        setIsEditing({ ...isEditing, [field]: true });
        setEditValues({ ...editValues, [field]: gameData[field] });
    };

    const handleBlur = (field) => {
        saveChanges(field);
    };

    const handleKeyDown = (e, field) => {
        if (e.key === 'Enter') {
            saveChanges(field);
        }
    };

    const handleChange = (e, field) => {
        setEditValues({ ...editValues, [field]: e.target.value });
        setGameData({ ...gameData, [field]: e.target.value });
    };

    const handleGenreChange = (e, index) => {
        const updatedGenres = [...editValues.genres];
        updatedGenres[index] = e.target.value;
        setEditValues({ ...editValues, genres: updatedGenres });
        setGameData({ ...gameData, genres: updatedGenres });
    };

    const handleImageChange = (e) => {
        setEditValues({ ...editValues, cover: e.target.value });
        setGameData({ ...gameData, cover: e.target.value });
        setDisplayedImage(e.target.value);
    };

    const handleAddThumbnail = () => {
        if (newThumbnailUrl) {
            const updatedMedia = [...gameData.media, newThumbnailUrl];
            setGameData({ ...gameData, media: updatedMedia });
            setNewThumbnailUrl('');

            // Optionally, update the game with the new thumbnail in the backend
            updateGame(id, { media: updatedMedia })
                .then(() => console.log('Thumbnail added successfully'))
                .catch((error) => console.error('Error adding thumbnail:', error));
        }
        setAddingThumbnail(false);
    };

    const saveChanges = async (field) => {
        setIsEditing({ ...isEditing, [field]: false });

        try {
            await updateGame(id, { [field]: editValues[field] });
            console.log(`Game ${field} successfully updated.`);
        } catch (error) {
            console.error('Error updating the game:', error);
        }
    };

    return (
        <div className="game-page">
            <div className="game-header">
                <h1
                    onDoubleClick={() => handleDoubleClick('title')}
                    onBlur={() => handleBlur('title')}
                >
                    {isEditing.title ? (
                        <div>
                            <input
                                type="text"
                                value={editValues.title || ''}
                                onChange={(e) => handleChange(e, 'title')}
                                onBlur={() => handleBlur('title')}
                                onKeyDown={(e) => handleKeyDown(e, 'title')}
                                autoFocus
                            />
                            <button className='ConfirmEdit' onClick={() => saveChanges('title')}>Update</button>
                        </div>
                    ) : (
                        gameData.title
                    )}
                </h1>
            </div>

            <div className="game-content">
                <div className="game-media">
                    <div className="game-image">
                        {isEditing.cover ? (
                            <div>
                                <input
                                    type="text"
                                    value={editValues.cover || ''}
                                    onChange={handleImageChange}
                                    onBlur={() => handleBlur('cover')}
                                    onKeyDown={(e) => handleKeyDown(e, 'cover')}
                                    autoFocus
                                />
                                <button className='ConfirmEdit' onClick={() => saveChanges('cover')}>Update</button>
                            </div>
                        ) : (
                            <img
                                src={displayedImage}
                                alt={gameData.title}
                                onDoubleClick={() => handleDoubleClick('cover')}
                            />
                        )}
                    </div>

                    <div className="game-description">
                        <p
                            onDoubleClick={() => handleDoubleClick('description')}
                            onBlur={() => handleBlur('description')}
                        >
                            {isEditing.description ? (
                                <div>
                                    <textarea
                                        value={editValues.description || ''}
                                        onChange={(e) => handleChange(e, 'description')}
                                        onBlur={() => handleBlur('description')}
                                        onKeyDown={(e) => handleKeyDown(e, 'description')}
                                        autoFocus
                                    />
                                    <button className='ConfirmEdit' onClick={() => saveChanges('description')}>Update</button>
                                </div>
                            ) : (
                                gameData.description
                            )}
                        </p>
                        <div className="genres">
                            {isEditing.genres ? (
                                gameData.genres.map((genre, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            value={editValues.genres[index] || ''}
                                            onChange={(e) => handleGenreChange(e, index)}
                                            onBlur={() => handleBlur('genres')}
                                            onKeyDown={(e) => handleKeyDown(e, 'genres')}
                                            autoFocus
                                        />
                                        <button className='ConfirmEdit' onClick={() => saveChanges('genres')}>Update</button>
                                    </div>
                                ))
                            ) : (
                                gameData.genres.map((genre, index) => (
                                    <span
                                        key={index}
                                        onDoubleClick={() => handleDoubleClick('genres')}
                                    >
                                        {genre}
                                    </span>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="game-details">
                    <div className="purchase-info">
                        <span>Game Price</span>
                        <span
                            className="price"
                            onDoubleClick={() => handleDoubleClick('price')}
                            onBlur={() => handleBlur('price')}
                        >
                            {isEditing.price ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editValues.price || ''}
                                        onChange={(e) => handleChange(e, 'price')}
                                        onBlur={() => handleBlur('price')}
                                        onKeyDown={(e) => handleKeyDown(e, 'price')}
                                        autoFocus
                                    />
                                    <button className='ConfirmEdit' onClick={() => saveChanges('price')}>Update</button>
                                </div>
                            ) : (
                                `$${gameData.price}`
                            )}
                        </span>
                    </div>

                    <div className="meta-info">
                        <p
                            onDoubleClick={() => handleDoubleClick('developer')}
                            onBlur={() => handleBlur('developer')}
                        >
                            Developer: {isEditing.developer ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editValues.developer || ''}
                                        onChange={(e) => handleChange(e, 'developer')}
                                        onBlur={() => handleBlur('developer')}
                                        onKeyDown={(e) => handleKeyDown(e, 'developer')}
                                        autoFocus
                                    />
                                    <button className='ConfirmEdit' onClick={() => saveChanges('developer')}>Update</button>
                                </div>
                            ) : (
                                gameData.developer
                            )}
                        </p>
                        <p
                            onDoubleClick={() => handleDoubleClick('releaseDate')}
                            onBlur={() => handleBlur('releaseDate')}
                        >
                            Release Date: {isEditing.releaseDate ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editValues.releaseDate || ''}
                                        onChange={(e) => handleChange(e, 'releaseDate')}
                                        onBlur={() => handleBlur('releaseDate')}
                                        onKeyDown={(e) => handleKeyDown(e, 'releaseDate')}
                                        autoFocus
                                    />
                                    <button className='ConfirmEdit' onClick={() => saveChanges('releaseDate')}>Update</button>
                                </div>
                            ) : (
                                gameData.releaseDate
                            )}
                        </p>
                    </div>

                    <div className="thumbnails">
                        <img
                            src={gameData.cover}
                            alt="Cover"
                            onClick={() => handleThumbnailClick(gameData.cover)}
                            className={displayedImage === gameData.cover ? 'active' : ''}
                        />
                        {gameData.media.map((mediaUrl, index) => (
                            <img
                                key={index}
                                src={mediaUrl}
                                alt={`Screenshot ${index + 1}`}
                                onClick={() => handleThumbnailClick(mediaUrl)}
                                className={displayedImage === mediaUrl ? 'active' : ''}
                            />
                        ))}
                        {/* Add Thumbnail Button */}
                        {addingThumbnail ? (
                            <div className="add-thumbnail">
                                <input
                                    type="text"
                                    value={newThumbnailUrl}
                                    onChange={(e) => setNewThumbnailUrl(e.target.value)}
                                    placeholder="Enter image URL"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleAddThumbnail();
                                    }}
                                />
                                <button onClick={handleAddThumbnail}>Add</button>
                            </div>
                        ) : (
                            <button className='ConfirmEdit' onClick={() => setAddingThumbnail(true)}>+</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopGamePage;
