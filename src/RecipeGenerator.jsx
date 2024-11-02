import React, { useState } from 'react';
import axios from 'axios';

const RecipeGenerator = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '74d8b1017b7e451bb7a41783216db2a0'; // Replace with your actual API key

  const fetchRandomRecipe = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/random', {
        params: {
          apiKey: API_KEY,
          number: 1,
        },
      });
      setRecipe(response.data.recipes[0]);
    } catch (err) {
      setError('Failed to fetch recipe. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Random Recipe Generator</h1>
      <button onClick={fetchRandomRecipe} style={styles.button}>
        Get a Random Recipe
      </button>

      {loading && <p style={styles.text}>Loading...</p>}
      {error && <p style={{ ...styles.text, ...styles.error }}>{error}</p>}

      {recipe && (
        <div style={styles.recipeContainer}>
          <h2 style={styles.text}>{recipe.title}</h2>
          <img src={recipe.image} alt={recipe.title} style={styles.image} />
          <h3 style={styles.text}>Ingredients</h3>
          <ol style={styles.ingredientList}>
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id} style={styles.text}>
                {ingredient.original}
              </li>
            ))}
          </ol>
          <h3 style={styles.text}>Instructions</h3>
          <p style={styles.text}>{recipe.instructions}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#000', // Black background
    minHeight: '100vh',
    color: '#fff', // White text color
  },
  heading: {
    color: '#fff',
  },
  button: {
    padding: '10px 20px',
    margin: '20px 0',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#333', // Dark button background
    color: '#fff', // White button text
    border: 'none',
    borderRadius: '5px',
  },
  recipeContainer: {
    maxWidth: '600px',
    margin: 'auto',
    textAlign: 'left',
    color: '#fff', // Ensures text within recipeContainer is white
  },
  image: {
    width: '100%',
    borderRadius: '8px',
  },
  text: {
    color: '#fff', // White text for all paragraphs and list items
  },
  error: {
    color: 'red', // Red for error messages
  },
  ingredientList: {
    listStyleType: 'decimal', // Sets the list to be ordered
    paddingLeft: '20px', // Optional: add some padding for better indentation
  },
};

export default RecipeGenerator;

