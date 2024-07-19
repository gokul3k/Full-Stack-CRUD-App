import React from "react";

export default function CustomerForm(props){

  const {
    FirstName = '',
    LastName = '',
    Age = '',
    Country = ''
  } = props.customer || {}; // Also account for props.customer being null/undefined
  
  const { handleChange } = props;
    
    return (
        <form className="customer--form" onSubmit={props.handleSubmit}>
        <input
          type="text"
          name="FirstName"
          placeholder="First Name"
          value={FirstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="LastName"
          placeholder="Last Name"
          value={LastName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="Age"
          placeholder="Age"
          value={Age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Country"
          placeholder="Country"
          value={Country}
          onChange={handleChange}
          required
        />
        
        <button type="submit">Submit</button>
      </form>
    )
}