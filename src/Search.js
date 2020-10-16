import React, { useState, useEffect } from 'react'
import pet, { ANIMALS } from '@frontendmasters/pet'
import useDropdown from './useDropdown'
import Results from './Results'

const Search = () => {
  const [location, setLocation] = useState('')
  const [breeds, setBreeds] = useState([])
  const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS)
  const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds)
  const [pets, setPets] = useState([])

  const requestPets = async () => {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    })
    setPets(animals || [])
  }

  //the breeds from above in the useState is not the same breeds used in the useEffect below

  useEffect(() => {
    setBreeds([])
    setBreed('')

    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      const breedStrings = apiBreeds.map(({ name }) => name)
      setBreeds(breedStrings)
    }, console.error)
  }, [animal, setBreed, setBreeds])

  return (
    <div className='search-params'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          requestPets()
        }}
      >
        <label htmlFor='location'>
          location
          <input
            id='location'
            value={location}
            placeholder='Location'
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  )
}

export default Search
