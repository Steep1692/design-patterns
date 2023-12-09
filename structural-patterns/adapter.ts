// Adapter makes things work after they're designed;
// Bridge makes them work before they are

// Usage in mundane:
// – MUI DatePicker adapters for popular time libraries

interface IThirdPartyToaster {
  showToast(text: string, id?: string, duration?: number): void
  hideToast(id: string): void
  isToastShown(id: string): boolean
}

class ThirdPartyToaster implements IThirdPartyToaster {
  showToast(text: string, id?: string, duration?: number) {}
  hideToast(id: string) {}
  isToastShown(id: string) { return true }
}

type AppToasterShowOptions = {
  text: string,
  id?: string,
  duration?: number
}

interface IAppToaster {
  show(options: AppToasterShowOptions): void
  hide(id: string): void
  isShown(id: string): boolean
}

class ToasterAdapter implements IAppToaster {
  constructor(
    public thirdPartyToaster: IThirdPartyToaster
  ) {}

  show(options: AppToasterShowOptions) {
    this.thirdPartyToaster.showToast(options.text, options.id, options.duration)
  }

  hide(id: string) {
    this.thirdPartyToaster.hideToast(id)
  }

  isShown(id: string): boolean {
    return this.thirdPartyToaster.isToastShown(id)
  }
}


const thirdPartyToaster = new ThirdPartyToaster()
const appToaster = new ToasterAdapter(thirdPartyToaster)


const toasterId = 'test'
appToaster.show({ text: 'Hello word!', id: toasterId, duration: 500 })

const isShown = appToaster.isShown(toasterId)
if (isShown) {
  appToaster.hide(toasterId)
}