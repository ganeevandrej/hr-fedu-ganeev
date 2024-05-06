type DictionaryNames = 'rejectReasons' | 'workTypes' | 'taskStatuses';

type Dictionaries = Record<DictionaryNames, Dictionary[]>;

type Dictionary = {
	code: string;
	value: string;
};

export { Dictionary, Dictionaries, DictionaryNames };
