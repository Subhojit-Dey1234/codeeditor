export type Question = {
    id: String;
    basic_code: String;
};

export type TestCase = {
    question_id: String;
    result: String;
    default_code: String;
}