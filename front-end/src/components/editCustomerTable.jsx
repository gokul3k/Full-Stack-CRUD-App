import React from 'react'

export default function EditCustomerTable(props){
    const {
        FirstName = '',
        LastName = '',
        Age = '',
        Country = ''
      } = props.customer || {}; // Also account for props.customer being null/undefined
      
      const { handleChange} = props;
    
    
      return (
          <form className="customer--form" onSubmit={props.handleUpdateSubmit}>
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
            value={LastName}
            placeholder="Last Name"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="Age"
            value={Age}
            placeholder="Age"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="Country"
            value={Country}
            placeholder="Country"
            onChange={handleChange}
            required
          />
          
          <button type="submit">Update Now</button>
        </form>
      )
  }