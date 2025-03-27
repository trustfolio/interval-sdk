export declare function sleep(ms: number): Promise<unknown>;
export declare function getImageUrl(inputUser: {
    first_name: string;
    last_name: string;
}): string;
export declare function mapToSelectOption(inputUser: {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
}): {
    value: string;
    label: string;
    description: string;
    imageUrl: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
};
export declare function mapToIntervalUser(inputUser: {
    first_name: string;
    last_name: string;
    email: string;
    username: string;
}): {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
};
export declare const fakeDb: {
    find(input: string): Promise<({
        email: string;
        gender: string;
        phone_number: string;
        birthdate: number;
        location: {
            street: string;
            city: string;
            state: string;
            postcode: number;
        };
        username: string;
        password: string;
        first_name: string;
        last_name: string;
        title: string;
        picture: string;
    } | {
        email: string;
        gender: string;
        phone_number: string;
        birthdate: number;
        location: {
            street: string;
            city: string;
            state: string;
            postcode: string;
        };
        username: string;
        password: string;
        first_name: string;
        last_name: string;
        title: string;
        picture: string;
    })[]>;
};
export declare function generateRows(count: number, offset?: number): {
    boolean: boolean;
    date: Date;
    image: string;
    array: string[];
    id: number;
    name: string;
    email: string;
    description: string;
    number: number;
}[];
