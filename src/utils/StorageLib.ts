class StorageLib {
  private static StorageIns: StorageLib;

  /**
   * θ·εεδΎ
   */
  public static getInstance(): StorageLib {
    if (this.StorageIns == null) {
      this.StorageIns = new StorageLib();
    }
    return this.StorageIns;
  }

  set(key: string, value: any): void {
    localStorage.setItem(key, encodeURIComponent(JSON.stringify(value)));
  }

  get(key: string): any {
    const storageData: any = localStorage.getItem(key);
    return JSON.parse(decodeURIComponent(storageData));
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}

const StorageIns = StorageLib.getInstance();

export default StorageIns;
