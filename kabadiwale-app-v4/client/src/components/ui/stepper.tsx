import * as React from "react"
import { cn } from "@/lib/utils"

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  completed?: boolean
  index: number
  children?: React.ReactNode
}

const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ active, completed, index, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "step-item flex flex-col items-center",
          active && "active",
          className
        )}
        {...props}
      >
        <div 
          className={cn(
            "step-count w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-medium",
            active && "bg-primary text-white"
          )}
        >
          {index}
        </div>
        <div className="text-sm mt-2 text-center">{children}</div>
      </div>
    )
  }
)
Step.displayName = "Step"

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  activeStep: number
  children?: React.ReactNode
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ activeStep, children, className, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children).filter(Boolean)
    
    const steps = childrenArray.map((child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          index: index + 1,
          active: index + 1 <= activeStep,
          completed: index + 1 < activeStep,
        })
      }
      return child
    })

    return (
      <div
        ref={ref}
        className={cn("stepper flex justify-between", className)}
        {...props}
      >
        {steps}
      </div>
    )
  }
)
Stepper.displayName = "Stepper"

export { Stepper, Step }
