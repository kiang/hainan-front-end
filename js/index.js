var router = new Router();
router.add('index', () => index.checked = true)
router.add('active', () => active.checked = true)
router.add('feedback', () => feedback.checked = true)


const listing = document.querySelector('#listing');
listing.addEventListener('click', () => mapsList.checked = false)
