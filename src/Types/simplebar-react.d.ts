declare module "simplebar-react" {
	import * as React from "react";

	interface SimpleBarProps extends React.HTMLAttributes<HTMLElement> {
		scrollableNodeProps?: React.HTMLAttributes<HTMLElement>;
		style?: React.CSSProperties;
		className?: string;
	}

	class SimpleBar extends React.Component<SimpleBarProps> {}
	export default SimpleBar;
}
