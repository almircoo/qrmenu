import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { MainLayout } from '@/layouts/MainLayout'
import { LoaderIcon } from 'lucide-react'

export const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { token, loading, signIn } = useAuth()

  useEffect(() => {
    if (token) {
      navigate("/places", { replace: true })
    }
  }, [token, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    signIn(username, password, () => navigate("/places", { replace: true }))
  }
  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Usuario</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Ingresar usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Contrasena</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Olvidaste tu contrasena?
                    </a>
                  </div>
                  <Input 
                    id="password"
                    type="password"
                    placeholder="Ingresar contrasena"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <LoaderIcon className="mr-2 h-4 w-4" />
                      Signing in...
                    </>
                  ) : (
                    "Iniciar Session"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button onClick={() => navigate("/register")} variant="outline" className="w-full">
              Registrarse
            </Button>
          </CardFooter>
        </Card>
      </div>
      
    </MainLayout>
  )
}
