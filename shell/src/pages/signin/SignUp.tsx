import { Button } from '@/components/custom/button'
import Iconify from '@/components/custom/iconify'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { _signup } from '@/redux/actions/signin'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

const FormSchema = z
  .object({
    first_name: z
      .string()
      .trim()
      .min(1, 'First name is required')
      .min(2, 'First name must be at least 2 characters')
      .max(100, 'First name is too long'),
    last_name: z
      .string()
      .trim()
      .min(1, 'Last name is required')
      .min(2, 'Last name must be at least 2 characters')
      .max(100, 'Last name is too long'),
    email: z
      .string()
      .trim()
      .min(1, 'Email is required')
      .email('Enter a valid email address')
      .max(100, 'Email is too long'),
    mobile_number: z
      .string()
      .trim()
      .min(1, 'Mobile number is required')
      .regex(/^[0-9]{10,15}$/, 'Enter a valid mobile number (10-15 digits)'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof FormSchema>

const defaultValues: FormValues = {
  first_name: '',
  last_name: '',
  email: '',
  mobile_number: '',
  password: '',
  confirmPassword: '',
}

const SignUp = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isloading } = useAppSelector((root) => root.signin)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues,
  })

  const { errors } = form.formState

  const handleSubmit = async (data: FormValues) => {
    const { payload }: any = await dispatch(
      _signup({
        value: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          mobile_number: data.mobile_number,
          password: data.password,
        },
        navigate,
      })
    )

    if (payload && payload.data && payload.data.status) {
      toast.success('Account created. Please sign in.')
      form.reset(defaultValues)
      navigate('/sign-in')
    } else {
      toast.error(payload?.data?.message || 'Please Try Again')
    }
  }

  return (
    <div className='h-screen w-full'>
      <div className='grid h-full grid-cols-1 lg:grid-cols-2'>
        {/* Brand / illustration panel */}
        <div className='relative hidden h-screen lg:block'>
          <img
            src={'/image.jpg'}
            alt='Devappment'
            className='h-full w-full object-cover'
          />
          <div className='absolute inset-0 bg-[#001b71]/40' />
          <div className='absolute bottom-10 left-10 right-10 text-white'>
            <h2 className='text-3xl font-bold'>Devappment</h2>
            <p className='mt-2 max-w-md text-sm text-white/90'>
              Create an account to manage your tasks, track your team, and stay
              productive — all in one place.
            </p>
          </div>
        </div>

        {/* Form panel */}
        <div className='flex items-center justify-center h-screen p-6 sm:p-10'>
          <div className='w-full max-w-sm'>
            <div className='mb-8 flex flex-col items-center text-center'>
              <img
                src={'/logo.jpg'}
                alt='Logo'
                className='mb-4 h-12 w-12 rounded-md object-cover'
              />
              <h1 className='text-2xl font-bold text-[#001b71]'>
                Create account
              </h1>
              <p className='mt-1 text-sm text-muted-foreground'>
                Sign up to get started with Devappment
              </p>
            </div>

            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='flex flex-col gap-4'
              noValidate
            >
              <div className='grid grid-cols-2 gap-3'>
                <div className='flex flex-col gap-1.5'>
                  <Label htmlFor='first_name'>First Name</Label>
                  <Input
                    id='first_name'
                    type='text'
                    autoComplete='given-name'
                    placeholder='Jane'
                    aria-invalid={!!errors.first_name}
                    {...form.register('first_name')}
                  />
                  {errors.first_name ? (
                    <p className='text-xs text-destructive'>
                      {errors.first_name.message}
                    </p>
                  ) : null}
                </div>

                <div className='flex flex-col gap-1.5'>
                  <Label htmlFor='last_name'>Last Name</Label>
                  <Input
                    id='last_name'
                    type='text'
                    autoComplete='family-name'
                    placeholder='Doe'
                    aria-invalid={!!errors.last_name}
                    {...form.register('last_name')}
                  />
                  {errors.last_name ? (
                    <p className='text-xs text-destructive'>
                      {errors.last_name.message}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className='flex flex-col gap-1.5'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  autoComplete='email'
                  placeholder='you@example.com'
                  aria-invalid={!!errors.email}
                  {...form.register('email')}
                />
                {errors.email ? (
                  <p className='text-xs text-destructive'>{errors.email.message}</p>
                ) : null}
              </div>

              <div className='flex flex-col gap-1.5'>
                <Label htmlFor='mobile_number'>Mobile Number</Label>
                <Input
                  id='mobile_number'
                  type='tel'
                  inputMode='numeric'
                  autoComplete='tel'
                  placeholder='9876543210'
                  aria-invalid={!!errors.mobile_number}
                  {...form.register('mobile_number')}
                />
                {errors.mobile_number ? (
                  <p className='text-xs text-destructive'>
                    {errors.mobile_number.message}
                  </p>
                ) : null}
              </div>

              <div className='flex flex-col gap-1.5'>
                <Label htmlFor='password'>Password</Label>
                <div className='relative'>
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    autoComplete='new-password'
                    placeholder='Create a password'
                    className='pr-10'
                    aria-invalid={!!errors.password}
                    {...form.register('password')}
                  />
                  <Iconify
                    icon={showPassword ? 'tabler:eye-off' : 'tabler:eye'}
                    className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                </div>
                {errors.password ? (
                  <p className='text-xs text-destructive'>
                    {errors.password.message}
                  </p>
                ) : null}
              </div>

              <div className='flex flex-col gap-1.5'>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <div className='relative'>
                  <Input
                    id='confirmPassword'
                    type={showConfirm ? 'text' : 'password'}
                    autoComplete='new-password'
                    placeholder='Re-enter your password'
                    className='pr-10'
                    aria-invalid={!!errors.confirmPassword}
                    {...form.register('confirmPassword')}
                  />
                  <Iconify
                    icon={showConfirm ? 'tabler:eye-off' : 'tabler:eye'}
                    className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground'
                    onClick={() => setShowConfirm((prev) => !prev)}
                  />
                </div>
                {errors.confirmPassword ? (
                  <p className='text-xs text-destructive'>
                    {errors.confirmPassword.message}
                  </p>
                ) : null}
              </div>

              <Button
                type='submit'
                size='lg'
                loading={isloading || form.formState.isSubmitting}
                className='mt-2 w-full'
              >
                Create Account
              </Button>
            </form>

            <p className='mt-6 text-center text-sm text-muted-foreground'>
              Already have an account?{' '}
              <button
                type='button'
                className='font-medium text-[#001b71] hover:underline'
                onClick={() => navigate('/sign-in')}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
