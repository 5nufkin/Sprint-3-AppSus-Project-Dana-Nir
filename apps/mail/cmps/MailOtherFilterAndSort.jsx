const { useState, useEffect } = React

export function MailOtherFilterAndSort({ onSetFilterBy, onSetSortBy, filterBy, sortBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })
    const [isChecked, setIsChecked] = useState(false)
    const [readActive , setReadActive] = useState('')
    const [dateActive , setDateActive] = useState('')

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])
    
    useEffect(() => {
        onSetSortBy(sortByToEdit)
    }, [sortByToEdit])

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
        setReadActive(target.checked ? 'active' : '')
        setFilterByToEdit(prevFilterBy => ({...prevFilterBy, [field]: value}))
    }

    function handleSortChange({ target }) {
        const field = target.name
        setIsChecked(target.checked)
        const value = isChecked ? 1 : -1

        setSortByToEdit({ [field]: value })
        setDateActive(target.checked ? 'active' : '')
    }
    
    const { isRead, status } = filterByToEdit
    const { sentAt, createdAt, subject } = sortByToEdit
    

    return (
        <section className="other-filter">
            <form className="flex">
                <label>
                    <div className={`other-filter-btn ${readActive}`}>
                    <input type="checkbox" name="isRead"
                    onChange={handleFilterChange}/>
                    <span className="custom-checkmark"></span> Unread
                    </div>
                </label>

                {/* <label>
                    <input type="checkbox" name="subject"
                    onChange={handleSortChange}/> 
                    <span className="custom-checkmark"></span> <img src="assets/img/mail/asc.svg"/> Subject
                </label> */}

                <label>
                    <div className={`other-filter-btn ${dateActive}`}>
                    <input type="checkbox" name={status === 'draft' ? 'createdAt' : 'sentAt'}
                    onChange={handleSortChange}/>
                    <span className="custom-checkmark"></span> <img src={`assets/img/mail/${isChecked ? 'desc' : 'asc'}.svg`}/> Date
                    </div>
                </label>

            </form>
        </section>
    )
}