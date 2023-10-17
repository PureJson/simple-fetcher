import RequestFormDataValueTypeList from "../../lists/RequestFormDataValueTypeList/RequestFormDataValueTypeList";
import { FileSelect } from "../../ui/FileSelect/FileSelect";
import Input from "../../ui/Input/Input";
import Tippy from "@tippyjs/react";
import {
	IconTrash,
	IconGripVertical,
	IconCheckbox,
	IconSquare,
	IconChevronDown,
	IconX
} from "@tabler/icons-react";

import { v1 as uuidv1 } from "uuid";

import { useAppDispatch } from "../../../hooks/redux/redux";
import requestBodyFormDataSlice, {
	BodyFormDataItem
} from "../../../redux/reducers/requestBodyFormDataSlice";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./styles/FormDataListItem.scss";

interface FormDataListItemProps {
	formData: BodyFormDataItem;
}

const FormDataListItem = ({ formData }: FormDataListItemProps) => {
	const dispatch = useAppDispatch();
	const {
		updateFormDataState,
		updateFormDataKey,
		updateFormDataValue,
		updateFormDataFileInfo,
		deleteFormData
	} = requestBodyFormDataSlice.actions;

	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: formData._id
	});
	const styleOnDrag = {
		transform: CSS.Transform.toString(transform),
		transition
	};

	return (
		<section
			ref={setNodeRef}
			style={styleOnDrag}
			className="form_data_item"
		>
			<section className="form_data_controls">
				<div className="form_data_dragger">
					<IconGripVertical
						style={{ outline: "none" }}
						size={16}
						{...attributes}
						{...listeners}
					/>
				</div>
				<div className="form_data_select">
					{formData.isUsed ? (
						<IconCheckbox
							size={16}
							onClick={() => {
								dispatch(updateFormDataState(formData._id));
							}}
						/>
					) : (
						<IconSquare
							size={16}
							onClick={() => {
								dispatch(updateFormDataState(formData._id));
							}}
						/>
					)}
				</div>
			</section>
			<section className="form_data_key_val">
				<div className="form_data_key">
					<Input
						name={`form_data_key=${formData.key}`}
						placeholder="Data key"
						inputStyle="invisible"
						onChange={(event) => {
							dispatch(
								updateFormDataKey({
									formDataID: formData._id,
									newKey: event?.target.value
								})
							);
						}}
						defaultValue={formData.key}
					/>
					<Tippy
						className="form_data_value_type_tippy"
						placement="bottom"
						content={<RequestFormDataValueTypeList item={formData} />}
						interactive={true}
						hideOnClick={true}
						animation="shift-away"
						trigger="click"
						arrow={false}
						zIndex={10}
						offset={[10, 5]}
					>
						<div className="form_data_select">
							<span className="form_data_current">{formData.valueType}</span>
							<IconChevronDown size={14} />
						</div>
					</Tippy>
				</div>
				<div className="form_data_val">
					{formData.valueType === "text" ? (
						<Input
							name={`form_data_value=${formData.value}`}
							placeholder="Data value"
							inputStyle="invisible"
							onChange={(event) => {
								dispatch(
									updateFormDataValue({
										formDataID: formData._id,
										newValue: event?.target.value
									})
								);
							}}
							defaultValue={formData.value}
						/>
					) : formData.fileInfo.id ? (
						<div className="form_data_file_item">
							<div className="file_name">{formData.fileInfo.name}</div>
							<IconX
								className="form_data_file_item_delete"
								size={12}
								onClick={() => {
									const idbRequest = indexedDB.open("request-body-files", 1);
									idbRequest.onsuccess = () => {
										const db = idbRequest.result;
										const tx = db.transaction("files", "readwrite");
										const filesStore = tx.objectStore("files");

										const deletingFile = filesStore.delete(formData.fileInfo.id);

										deletingFile.onsuccess = () => {
											tx.oncomplete = () => {
												db.close();
											};
										};
									};

									dispatch(
										updateFormDataValue({
											formDataID: formData._id,
											newValue: ""
										})
									);
									dispatch(
										updateFormDataFileInfo({
											id: formData._id,
											value: {
												id: "",
												name: ""
											}
										})
									);
								}}
							/>
						</div>
					) : (
						<FileSelect
							elementStyle="small"
							onChange={async (event) => {
								const fileId: string = uuidv1();
								const fileName: string = event.target.files![0].name;
								const tempUrlToFile = URL.createObjectURL(event.target.files![0]);
								const blobFromFile = await fetch(tempUrlToFile).then((res) => res.blob());

								const idbRequest = indexedDB.open("request-body-files", 1);
								idbRequest.onsuccess = () => {
									const db = idbRequest.result;
									const tx = db.transaction("files", "readwrite");
									const filesStore = tx.objectStore("files");
									const newFile = filesStore.put({
										id: fileId,
										name: fileName,
										blob: blobFromFile
									});
									newFile.onsuccess = () => {
										tx.oncomplete = () => {
											db.close();
										};
									};
								};
								dispatch(
									updateFormDataFileInfo({
										id: formData._id,
										value: {
											id: fileId,
											name: fileName
										}
									})
								);
							}}
						/>
					)}
					<div className="form_data_delete">
						<IconTrash
							size={16}
							onClick={() => {
								dispatch(deleteFormData(formData._id));

								if (formData.valueType === "file") {
									const idbRequest = indexedDB.open("request-body-files", 1);

									idbRequest.onsuccess = () => {
										const db = idbRequest.result;
										const tx = db.transaction("files", "readwrite");
										const filesStore = tx.objectStore("files");

										const deletingFile = filesStore.delete(formData.fileInfo.id);

										deletingFile.onsuccess = () => {
											tx.oncomplete = () => {
												db.close();
											};
										};
									};
								}
							}}
						/>
					</div>
				</div>
			</section>
		</section>
	);
};

export default FormDataListItem;