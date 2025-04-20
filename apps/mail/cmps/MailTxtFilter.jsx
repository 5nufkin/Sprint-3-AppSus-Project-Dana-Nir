const { useState, useEffect } = React

export function MailTxtFilter({ onSetFilterBy, filterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function onSubmitFilter(ev) {
        ev.preventDefualt()
        onSetFilterBy(filterByToEdit)
    }

    function handleFilterChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilterBy => ({...prevFilterBy, [field]: value}))
    }
    
    const { txt } = filterByToEdit
    

    return (
        <section className="text-filter">
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">
                    <div className="search-bar flex align-center">
                <button><img src={'assets/img/mail/search.svg'} /></button>
                <input onChange={handleFilterChange} value={txt} name="txt" id="txt" type="text" placeholder="Search Mail" />
                    </div>
                </label>

                {/* <label htmlFor="categories">Categories:</label>
                    <select 
                        id="categories"
                        onChange={handleChange}
                        name="categories"
                    >
                        <option value="">Select an option</option>
                        {categories.map(category => {
                            return <option key={category} value={category}>{category}</option>
                        })}
                    </select> */}

            </form>
        </section>
    )
}