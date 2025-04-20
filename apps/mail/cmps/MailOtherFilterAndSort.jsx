const { useState, useEffect } = React

export function MailTxtFilter(onSetFilterBy, onSetSortBy, filterBy, sortBy) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
        onSetSortBy(sortByToEdit)
    }, [filterByToEdit, sortByToEdit])

    // function onSubmitFilter(ev) {
    //     ev.preventDefualt()
    //     onSetFilterBy (filterByToEdit)
    // }

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

    function handleSortChange({ target }) {
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
        setSortByToEdit({ [field]: value })
    }
    
    const { isRead, status } = filterByToEdit
    const { sentAt, createdAt, subject } = sortByToEdit
    

    return (
        <section className="other-filter">
            <form>
                <label>
                    <input type="checkbox" name="isRead"
                    onChange={handleFilterChange}/>Unread
                </label>

                <label>
                    <input type="checkbox" name="subject"
                    onChange={handleSortChange}/><img src="assets/img/mail/asc.svg"/> Subject
                </label>

                <label>
                    <input type="checkbox" name={status === 'draft' ? 'createdAt' : 'sentAt'}
                    onChange={handleSortChange}/><img src="assets/img/mail/asc.svg"/> Date
                </label>

            </form>
        </section>
    )
}