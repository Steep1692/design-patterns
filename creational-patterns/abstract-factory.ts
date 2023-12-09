// Abstract [Product 1] of [Abstract Factory 1]
interface ThemeColors {
  color: string;
  backgroundColor: string;
}

// Abstract [Product 2] of [Abstract Factory 1]
interface ThemeSounds {
  playSubmit()
  playCancel()
}

// Abstract [Product 2] of [Abstract Factory 1]
interface ThemeAnimations {
  playIn()
  playOut()
}

// Abstract [Factory 1]
interface ThemeFactory {
  createThemeColors(): ThemeColors
  createThemeSounds(): ThemeSounds
  createThemeAnimations(): ThemeAnimations
}


// Concrete Products Implementations
class CP_DarkThemeColors implements ThemeColors {
  color = 'white';
  backgroundColor = 'black';
}

class CP_LightThemeColors implements ThemeColors {
  color = 'black';
  backgroundColor = 'white';
}

class CP_LightThemeAnimations implements ThemeAnimations {
  playIn() {}
  playOut() {}
}


class CP_LightThemeSounds implements ThemeSounds {
  playSubmit() {}
  playCancel() {}
}

class CP_DarkThemeSounds implements ThemeSounds {
  playSubmit() {}
  playCancel() {}
}

class CP_DarkThemeAnimations implements ThemeAnimations {
  playIn() {}
  playOut() {}
}


// Concrete Factories Implementations
class CF_LightFactory implements ThemeFactory {
  createThemeColors(): ThemeColors {
    return new CP_LightThemeColors()
  }
  createThemeSounds(): ThemeSounds {
    return new CP_LightThemeSounds()
  }
  createThemeAnimations(): ThemeAnimations {
    return new CP_LightThemeAnimations()
  }
}

class CF_DarkFactory implements ThemeFactory {
  createThemeColors(): ThemeColors {
    return new CP_DarkThemeColors()
  }
  createThemeSounds(): ThemeSounds {
    return new CP_DarkThemeSounds()
  }
  createThemeAnimations(): ThemeAnimations {
    return new CP_DarkThemeAnimations()
  }
}



class Application {
  constructor(
    public factory: ThemeFactory
  ) {}

  applyTheme() {
    const colors = this.factory.createThemeColors()
    const sounds = this.factory.createThemeSounds()
    const animations = this.factory.createThemeAnimations()

    console.log(colors, sounds, animations);
    // CODE: on button click => if submit sounds.playSubmit() else sounds.playCancel()
  }
}

class ApplicationBootstrapper {
  constructor(isDark: boolean) {
    const Factory = isDark ? CF_DarkFactory : CF_LightFactory
    const factoryInstance = new Factory()
    const application = new Application(factoryInstance);
    application.applyTheme()
  }
}

new ApplicationBootstrapper(false)