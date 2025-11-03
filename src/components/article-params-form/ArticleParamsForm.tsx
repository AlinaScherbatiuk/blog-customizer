import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select/Select';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Separator } from 'src/ui/separator/Separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useClickAway } from 'src/hooks/useClickAway';
import styles from './ArticleParamsForm.module.scss';

type FormProps = {
	onSettingsApply: (settings: ArticleStateType) => void;
	initialSettings: ArticleStateType;
};

export const ArticleParamsForm = ({
	onSettingsApply,
	initialSettings,
}: FormProps) => {
	const [isSidebarVisible, setIsSidebarVisible] = useState(false);
	const [currentFormData, setCurrentFormData] =
		useState<ArticleStateType>(initialSettings);
	const sidebarRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		setCurrentFormData(initialSettings);
	}, [initialSettings]);

	useClickAway(sidebarRef, () => setIsSidebarVisible(false), isSidebarVisible);

	const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);

	const updateField = <K extends keyof ArticleStateType>(
		fieldName: K,
		fieldValue: ArticleStateType[K]
	) => {
		setCurrentFormData((prev) => ({
			...prev,
			[fieldName]: fieldValue,
		}));
	};

	const submitForm = (e: React.FormEvent) => {
		e.preventDefault();
		onSettingsApply(currentFormData);
		setIsSidebarVisible(false);
	};

	const resetToDefaults = () => {
		setCurrentFormData(initialSettings);
		onSettingsApply(initialSettings);
	};

	return (
		<>
			<ArrowButton isOpen={isSidebarVisible} onClick={toggleSidebar} />
			<aside
				aria-hidden={!isSidebarVisible}
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarVisible,
				})}>
				<form
					className={styles.form}
					onSubmit={submitForm}
					onReset={resetToDefaults}>
					<Text size={31} weight={800} uppercase align='left'>
						Задайте параметры
					</Text>

					<div className={styles.parametersContainer}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={currentFormData.fontFamilyOption}
							onChange={(opt) => updateField('fontFamilyOption', opt)}
						/>
						<RadioGroup
							name='fontSize'
							title='Размер шрифта'
							options={fontSizeOptions}
							selected={currentFormData.fontSizeOption}
							onChange={(opt) => updateField('fontSizeOption', opt)}
						/>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={currentFormData.fontColor}
							onChange={(opt) => updateField('fontColor', opt)}
						/>
					</div>

					<Separator />

					<div className={styles.parametersContainer}>
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={currentFormData.backgroundColor}
							onChange={(opt) => updateField('backgroundColor', opt)}
						/>
						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={currentFormData.contentWidth}
							onChange={(opt) => updateField('contentWidth', opt)}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
