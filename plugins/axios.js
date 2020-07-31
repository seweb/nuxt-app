export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        'Content-Type': 'application/json'
      }
    }
  })

  // Set baseURL to something different
  api.setBaseURL('http://test-frontend-api.herokuapp.com')

  // Inject to context as $api
  inject('api', api)
}
