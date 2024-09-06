/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/ZzMeJsCNWIE
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"

export function Carousel() {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent>
        <CarouselItem>
          <div className="flex flex-col items-center p-1">
            <img
              src="/placeholder.svg"
              alt="Image"
              width={400}
              height={225}
              className="aspect-video object-cover rounded-md"
            />
            <p className="text-sm font-medium mt-2.5">Beautiful flowers</p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex flex-col items-center p-1">
            <img
              src="/placeholder.svg"
              alt="Image"
              width={400}
              height={225}
              className="aspect-video object-cover rounded-md"
            />
            <p className="text-sm font-medium mt-2.5">Amazing sunset</p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex flex-col items-center p-1">
            <img
              src="/placeholder.svg"
              alt="Image"
              width={400}
              height={225}
              className="aspect-video object-cover rounded-md"
            />
            <p className="text-sm font-medium mt-2.5">Starry night</p>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}