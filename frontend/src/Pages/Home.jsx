const Home = () => {
    return (
        <div className={"flex mt-20"}>
            <div className={"m-auto md:w-2/3"}>
                <h3 className={"text-sky-300"}>Welcome!</h3>
                <p>This example application demonstrates the integration of a Java
                    Spring
                    Boot API back end with a React front end for task
                    management. The application allows users to register for an account, offering a secure and
                    personalized workspace. Once registered, users can create, edit, and delete tasks. Additionally, users can mark tasks as complete or
                    incomplete, enabling efficient tracking of their progress. The Spring Boot back end handles
                    authentication, data persistence, and business logic, while the React front end provides a
                    responsive and dynamic user interface. Building this application served as an educational
                    platform, allowing me to gain hands-on experience and deepen my knowledge of both Java
                    Spring
                    Boot and React, resulting in a robust and user-friendly task management system.</p>
            </div>
        </div>
    );
};

export default Home;