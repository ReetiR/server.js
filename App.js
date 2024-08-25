import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
    const [inputJson, setInputJson] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const jsonData = JSON.parse(inputJson);
            const res = await axios.post('YOUR_BACKEND_URL/bfhl', jsonData);
            setResponseData(res.data);
        } catch (error) {
            alert("Invalid JSON input");
        }
    };

    const handleSelectChange = (selectedOptions) => {
        setSelectedOptions(selectedOptions);
    };

    const renderResponse = () => {
        if (!responseData) return null;
        const options = selectedOptions.map(option => option.value);
        return (
            <div>
                {options.includes('Numbers') && <div>Numbers: {responseData.numbers.join(', ')}</div>}
                {options.includes('Alphabets') && <div>Alphabets: {responseData.alphabets.join(', ')}</div>}
                {options.includes('Highest lowercase alphabet') && <div>Highest lowercase alphabet: {responseData.highest_lowercase_alphabet.join(', ')}</div>}
            </div>
        );
    };

    return (
        <div>
            <h1>ABCD123</h1>
            <textarea value={inputJson} onChange={(e) => setInputJson(e.target.value)} placeholder="Enter JSON here" />
            <button onClick={handleSubmit}>Submit</button>
            <Select
                options={[
                    { value: 'Alphabets', label: 'Alphabets' },
                    { value: 'Numbers', label: 'Numbers' },
                    { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' }
                ]}
                isMulti
                onChange={handleSelectChange}
            />
            {renderResponse()}
        </div>
    );
};

export default App;
