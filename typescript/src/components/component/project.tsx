import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Link} from "lucide-react";

function Project(props) {
    return (
        <Card>
            <CardHeader>
                <img
                    src="/placeholder.svg"
                    alt="Image 3"
                    className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                    width="300"
                    height="300"
                />
            </CardHeader>
            <CardContent>
                <h2 className="text-lg font-bold">{props.title}</h2>
                <p className="text-gray-600">{props.description}</p>
                <div className="flex items-center space-x-2 mt-2">
                    <Link href="#" className="text-blue-500 hover:underline">
                        View more
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default Project;