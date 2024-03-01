import { createContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null, // funcao que pode alterar o tema
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>( // metodo setTheme chamado via contexto (botao) para alterar o tema
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme // estado que armazena o tema atual. 
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)") // verifica o tema usado no sistema
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme) // adiona tema do sistema
      return
    }

    root.classList.add(theme) // caso nao for escolhido tema do sistema, usamos o que tem na variavel 'theme'
  }, [theme])

  const value = { // variavel a ser passada no contexto para chamada do metodo setTheme
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}


