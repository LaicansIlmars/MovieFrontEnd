class LocalStorageService {
  public setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify({value}))
  }

  public getItem<T>(key: string): T | null {
    const data: string | null = localStorage.getItem(key)

    if (data) {
      return JSON.parse(data).value
    }

    return null
  }
}

const localStorageService = new LocalStorageService()

export default localStorageService
