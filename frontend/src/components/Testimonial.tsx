// import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card, CardContent, CardFooter } from "./ui/card";

const testimonials = [
  {
    quote:
      "EQUIBridge connected me with a scholarship I didn't even know existed. Now I'm pursuing my computer science degree without the financial stress.",
    name: "Jasmine Chen",
    role: "Computer Science Student",
    avatar: "JC",
  },
  {
    quote:
      "As a single mother re-entering the workforce, I struggled to find flexible opportunities. Through EQUIBridge, I found a remote job that works with my schedule.",
    name: "Maria Rodriguez",
    role: "Marketing Specialist",
    avatar: "MR",
  },
  {
    quote:
      "The mentorship program I found through EQUIBridge has been transformative for my career. My mentor helped me navigate challenges specific to women in leadership.",
    name: "Aisha Johnson",
    role: "Product Manager",
    avatar: "AJ",
  },
];

const Testimonial = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from individuals who found life-changing opportunities through
            our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="card-hover bg-white border border-gray-200 relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-equibridge-purple text-white p-2 rounded-full">
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                </div>
              </div>
              <CardContent className="pt-8 pb-4">
                <p className="text-gray-600 italic">{testimonial.quote}</p>
              </CardContent>
              <CardFooter className="flex items-center border-t border-gray-100 pt-4">
                {/* <Avatar className="h-10 w-10 mr-3 bg-equibridge-soft-purple text-equibridge-purple">
                  <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                </Avatar> */}
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
