/**
 * Dynamic Search/Filter Function
 * * Filters a list of elements based on the text entered in a search input field.
 * This function is designed to work for both the main subject page and topic pages.
 * * @param {string} searchInputId - The ID of the input element (e.g., 'topicSearch', 'subjectSearch').
 * @param {string} listContainerId - The ID of the container holding the items to be filtered (e.g., 'topicItems', 'subjectItems').
 * @param {string} itemClass - The class name of the individual items (e.g., 'subject-box').
 */
function filterList(searchInputId, listContainerId, itemClass) {
    // 1. Get the search input value and convert it to uppercase for case-insensitive comparison
    const input = document.getElementById(searchInputId);
    const filter = input.value.toUpperCase();

    // 2. Get the container element for the list of items
    const ul = document.getElementById(listContainerId);

    // 3. Get all the individual items (the subject/topic boxes)
    // We use getElementsByClassName for flexibility, ensuring we only check the container's children.
    const items = ul.getElementsByClassName(itemClass);

    // 4. Loop through all list items and hide those that don't match the search query
    for (let i = 0; i < items.length; i++) {
        // The anchor tag <a> contains the text we want to search against
        const a = items[i].getElementsByTagName("a")[0];
        
        // If an anchor tag exists:
        if (a) {
            // Get the text content and convert to uppercase
            const textValue = a.textContent || a.innerText;

            // Check if the search filter is found within the text content
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                // Show the item if it matches
                items[i].style.display = "";
            } else {
                // Hide the item if it doesn't match
                items[i].style.display = "none";
            }
        }
    }
}