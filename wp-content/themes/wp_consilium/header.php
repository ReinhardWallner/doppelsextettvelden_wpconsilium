<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1">
	<?php global $smof_data, $post, $page, $paged;?>
	<?php if($smof_data['custom_css']){ echo '<style>'.$smof_data["custom_css"].'</style>'; } ?>
	<?php if($smof_data['space_head']){ echo $smof_data["space_head"]; } ?>
	<?php require_once ( get_template_directory() . '/framework/includes/header-extend.php' ); ?>
	<?php require_once ( get_template_directory() . '/framework/includes/dynamic_css.php' ); ?>
	<?php wp_head(); ?>
</head>
<?php
global $smof_data, $post;
/* post ID */
$c_pageID = null;
if($post){
    $c_pageID = $post->ID;
}
/* body class */
$body_class = 'csbody';
$wrapper_class = '';
if(is_page_template('blank.php')):
    $body_class = 'csbody body_blank';
    $wrapper_class = ' class="wrapper_blank"';
endif;
/* header setting */
global $header_setings;
$header_setings = cshero_generetor_header_setting();
$body_class = $header_setings->body_class;

if(is_page()){
	if(get_post_meta($c_pageID, 'cs_body_custom_class', true)){
		$body_class .= ' '.get_post_meta($c_pageID, 'cs_body_custom_class', true);
	}
}
/* site id */
$csSite = getCSSite();
$hidden_class='';
if(isset($smof_data['enable_hidden_sidebar']) && $smof_data['enable_hidden_sidebar']){
	$hidden_class = 'meny-'.$smof_data['hidden_sidebar_position'];
}
?>

<body <?php body_class($body_class.' '.$hidden_class); ?> <?php echo ($csSite!='')?'id="wp-consilium'.$csSite.'"':'id="wp-consilium"';?>>
    <?php if( $smof_data['page_loader'] == '1'):?>
    <div id="cs_loader" style="height:100vh;width:100vw;background-color:#FFF"></div>
    <?php endif;?>
	<div id="wrapper"<?php if( $smof_data['page_loader'] == '1'):?> class="cs_hidden"<?php endif;?>>
		<div class="header-wrapper">
    		<?php cshero_header(); ?>
		</div>
			<?php if(cshero_show_page_title() == '1'): ?>
			<div class="cs-content-header">
			<?php if($smof_data['page_title_bar_style'] == 'corporate'): ?>
			<div style="background:url(<?php echo esc_url($smof_data['page_title_image']); ?>) center top; background-size:cover;height:<?php if(esc_attr($smof_data['page_title_image_height'])){ echo esc_attr($smof_data['page_title_image_height']);} else { echo 'auto'; } ?>;">
			</div>
			<?php endif; ?>
			<div id="cs-page-title-wrapper" class="cs-page-title<?php if(get_post_meta($c_pageID, 'cs_page_title', true) == 'custom'){ echo " page-title-style"; } ?> <?php echo esc_attr(get_post_meta($c_pageID, 'cs_page_title_class', true)); ?>" data-stellar-background-ratio="0.5">
				<div class="container">
					<div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        	<?php
                        		$title_aling = 'left';
                        		if(get_post_meta($c_pageID, 'cs_title_bar_align', true) && get_post_meta($c_pageID, 'cs_page_title', true) == 'custom'){
									$title_aling = get_post_meta($c_pageID, 'cs_title_bar_align', true);
								} else {
									$title_aling = $smof_data['page_title_bar_align'];
								}
                        	?>
                        	<div class="title_bar_<?php echo esc_attr($title_aling); ?>">
                        	<?php
                        		$title_bar_tag = 'h2';
                        		if(get_post_meta($c_pageID, 'cs_title_bar_tag', true)){
									$title_bar_tag = get_post_meta($c_pageID, 'cs_title_bar_tag', true);
								}
                        	?>
                        	<!-- animate option -->
                        	<?php
                        	$page_title_animation = '0';
                        	   if(is_page()){
                        	       $page_title_animation = $smof_data['page_page_title_animation'];
                        	   } elseif (is_single()){
                        	       $page_title_animation = $smof_data['post_page_title_animation'];
                        	   } elseif (is_archive()){
                        	       $page_title_animation = $smof_data['archive_page_title_animation'];
                        	   } elseif (is_search()){
                        	       $page_title_animation = $smof_data['search_page_title_animation'];
                        	   } elseif (is_404()){
                        	       $page_title_animation = $smof_data['404_page_title_animation'];
                        	   }
                        	?>
                        	<div id="<?php if($page_title_animation == '1'){echo "title-animate";}?>">
	                            <h1 class="page-title">
	                                <?php
	                                if (is_page() && get_post_meta($c_pageID, 'cs_page_title_custom_text', true) != ""){
									    echo esc_attr(get_post_meta($c_pageID, 'cs_page_title_custom_text', true));
									} else {
										if (!is_archive()){
										    if(is_search()){
										        printf( __( 'Search Results for: %s', THEMENAME ), '<span>' . get_search_query() . '</span>' );
										    } elseif (is_404()){
										        _e( '404', THEMENAME);
										    } else {
										        the_title();
										    }
										} else {
											if ( is_category() ) :
											single_cat_title();
											elseif ( is_tag() ) :
											single_tag_title();
											elseif ( is_author() ) :
											printf( __( 'Author: %s', THEMENAME ), '<span class="vcard">' . get_the_author() . '</span>' );
											elseif ( is_day() ) :
											printf( __( 'Day: %s', THEMENAME ), '<span>' . get_the_date() . '</span>' );
											elseif ( is_month() ) :
											printf( __( 'Month: %s', THEMENAME ), '<span>' . get_the_date( _x( 'F Y', 'monthly archives date format', THEMENAME ) ) . '</span>' );
											elseif ( is_year() ) :
											printf( __( 'Year: %s', THEMENAME ), '<span>' . get_the_date( _x( 'Y', 'yearly archives date format', THEMENAME ) ) . '</span>' );
											elseif ( is_tax( 'post_format', 'post-format-aside' ) ) :
											_e( 'Asides', THEMENAME );
											elseif ( is_tax( 'post_format', 'post-format-gallery' ) ) :
											_e( 'Galleries', THEMENAME);
											elseif ( is_tax( 'post_format', 'post-format-image' ) ) :
											_e( 'Images', THEMENAME);
											elseif ( is_tax( 'post_format', 'post-format-video' ) ) :
											_e( 'Videos', THEMENAME );
											elseif ( is_tax( 'post_format', 'post-format-quote' ) ) :
											_e( 'Quotes', THEMENAME );
											elseif ( is_tax( 'post_format', 'post-format-link' ) ) :
											_e( 'Links', THEMENAME );
											elseif ( is_tax( 'post_format', 'post-format-status' ) ) :
											_e( 'Statuses', THEMENAME );
											elseif ( is_tax( 'post_format', 'post-format-audio' ) ) :
											_e( 'Audios', THEMENAME );
											elseif ( is_tax( 'post_format', 'post-format-chat' ) ) :
											_e( 'Chats', THEMENAME );
											else :
												if(!class_exists("WooCommerce")){
													_e( 'Archives', THEMENAME );
												}
												else{
													woocommerce_page_title();
												}
											endif;
										}
									}
	                                ?>
	                            </h1>
	                            <?php if(is_page() && get_post_meta($c_pageID, 'cs_page_title_custom_subheader_text', true) != ""): ?>
	                            <div class="sub_header_text">
	                            	<?php echo esc_attr(get_post_meta($c_pageID, 'cs_page_title_custom_subheader_text', true)); ?>
	                            </div>
                            <?php endif; ?>
                            </div>
                            </div>
                        </div>
					</div>
				</div>
			</div>
			</div>
		<?php endif; ?>
		<?php
		global $breadcrumb;
		$breadcrumb = cshero_show_breadcrumb();
		?>
		<?php if ($breadcrumb == '1'): ?>
		<div id="cs-breadcrumb-wrapper" <?php if($smof_data['breadcrumb_mobile'] != '1'){ echo 'class="hidden-xs"'; } ?>>
			<div class="container">
				<div class="row">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			        	<div class="cs-breadcrumbs">
						<?php cshero_breadcrumb();?>
			            </div>
			        </div>
			    </div>
			</div>
		</div>
		<?php endif; ?>
