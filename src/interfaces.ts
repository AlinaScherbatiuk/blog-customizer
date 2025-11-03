export type ChoiceItem = {
	value: string;
	title: string;
	optionClassName?: string;
	className?: string;
};

export type BlogSettings = {
	contentWidth: ChoiceItem;
	backgroundColor: ChoiceItem;
	fontColor: ChoiceItem;
	fontSizeOption: ChoiceItem;
	fontFamilyOption: ChoiceItem;
};
